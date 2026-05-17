"""
Prediction API route.
POST /api/predict — accepts questionnaire answers, returns risk prediction.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.schema import QuestionnaireInput, PredictionResponse
from app.services.preprocessing import preprocess_input
from app.services.model_loader import get_model, get_scaler

router = APIRouter()


def _risk_level(probability: float) -> tuple[int, str]:
    """Map raw probability to a 1-4 risk tier."""
    if probability < 0.30:
        return 1, "Low Priority"
    elif probability < 0.50:
        return 2, "Mild Concern"
    elif probability < 0.75:
        return 3, "Moderate Risk"
    else:
        return 4, "High Alert"


@router.post("/predict", response_model=PredictionResponse)
def predict(data: QuestionnaireInput):
    """
    Receive questionnaire answers, preprocess them exactly like
    notebook-02, scale with the saved StandardScaler, feed through
    the trained ANN, and return the risk prediction.
    """
    try:
        # 1. Encode raw answers → 38-column DataFrame
        df = preprocess_input(data.model_dump())

        # 2. Scale with the same scaler used during training
        scaler = get_scaler()
        X_scaled = scaler.transform(df)

        # 3. Predict with the trained ANN
        model = get_model()
        prob = float(model.predict(X_scaled, verbose=0)[0][0])

        # 4. Derive outputs
        prediction = 1 if prob >= 0.5 else 0
        level, label = _risk_level(prob)

        return PredictionResponse(
            prediction=prediction,
            probability=round(prob, 4),
            risk_level=level,
            risk_label=label,
        )

    except KeyError as e:
        raise HTTPException(
            status_code=422,
            detail=f"Missing or invalid answer value: {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )
