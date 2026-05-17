"""
NeuroHealth-ANN FastAPI Backend
Loads the trained ANN model + scaler and serves predictions.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router

app = FastAPI(
    title="NeuroHealth-ANN API",
    description="Mental health treatment prediction using trained ANN model",
    version="1.0.0",
)

# CORS — allow the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "message": "NeuroHealth-ANN API is running"}
