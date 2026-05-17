"""
Model loading utility.
Loads the trained Keras model and the fitted StandardScaler at startup.
"""

import os
import joblib
import tensorflow as tf

# Resolve paths relative to this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "model", "neurohealth_model.keras")
SCALER_PATH = os.path.join(BASE_DIR, "model", "standard_scaler.pkl")

_model = None
_scaler = None


def get_model():
    """Load (and cache) the Keras model."""
    global _model
    if _model is None:
        print(f"Loading model from: {MODEL_PATH}")
        _model = tf.keras.models.load_model(MODEL_PATH)
        _model.summary()
    return _model


def get_scaler():
    """Load (and cache) the StandardScaler."""
    global _scaler
    if _scaler is None:
        print(f"Loading scaler from: {SCALER_PATH}")
        _scaler = joblib.load(SCALER_PATH)
    return _scaler
