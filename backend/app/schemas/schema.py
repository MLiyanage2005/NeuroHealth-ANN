"""
Pydantic schema for questionnaire input.
Matches the frontend question names exactly.
"""

from pydantic import BaseModel
from typing import Optional


class QuestionnaireInput(BaseModel):
    """
    Mirrors the 22 questions from the frontend questionnaire.
    Field names match the 'name' property in frontend/src/data/questions.js
    """
    age: str
    gender: str
    self_employed: str
    family_history: str
    work_interfere: str
    no_employees: str
    remote_work: str
    tech_company: str
    benefits: str
    care_options: str
    wellness_program: str
    seek_help: str
    anonymity: str
    leave: str
    mental_health_consequence: str
    phys_health_consequence: str
    coworkers: str
    supervisor: str
    mental_health_interview: str
    phys_health_interview: str
    mental_vs_physical: str
    obs_consequence: str
    country_group: str


class PredictionResponse(BaseModel):
    """Response from the prediction endpoint."""
    prediction: int          # 0 = No Treatment, 1 = Treatment
    probability: float       # Raw sigmoid probability (0.0 – 1.0)
    risk_level: int          # 1-4 risk tier
    risk_label: str          # Human-readable label