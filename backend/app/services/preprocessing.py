"""
Preprocessing service — replicates the EXACT same encoding
used in notebook 02_preprocessing.ipynb so that the saved
StandardScaler and trained model receive identical features.

Feature order (38 columns) after encoding:
  Age, self_employed, family_history, work_interfere, no_employees,
  remote_work, tech_company, seek_help, leave, mental_health_consequence,
  phys_health_consequence, coworkers, supervisor, mental_health_interview,
  phys_health_interview, obs_consequence,
  Gender_Female, Gender_Male, Gender_Other,
  care_options_No, care_options_Not sure, care_options_Yes,
  benefits_Don't know, benefits_No, benefits_Yes,
  wellness_program_Don't know, wellness_program_No, wellness_program_Yes,
  anonymity_Don't know, anonymity_No, anonymity_Yes,
  mental_vs_physical_Don't know, mental_vs_physical_No, mental_vs_physical_Yes,
  Country_Group_Developed_Asia_Pacific, Country_Group_Developing,
  Country_Group_Other, Country_Group_Western_Developed
"""

import numpy as np
import pandas as pd

# =============================================
# COLUMN ORDER (must match training pipeline)
# =============================================
FEATURE_COLUMNS = [
    "Age",
    "self_employed",
    "family_history",
    "work_interfere",
    "no_employees",
    "remote_work",
    "tech_company",
    "seek_help",
    "leave",
    "mental_health_consequence",
    "phys_health_consequence",
    "coworkers",
    "supervisor",
    "mental_health_interview",
    "phys_health_interview",
    "obs_consequence",
    "Gender_Female",
    "Gender_Male",
    "Gender_Other",
    "care_options_No",
    "care_options_Not sure",
    "care_options_Yes",
    "benefits_Don't know",
    "benefits_No",
    "benefits_Yes",
    "wellness_program_Don't know",
    "wellness_program_No",
    "wellness_program_Yes",
    "anonymity_Don't know",
    "anonymity_No",
    "anonymity_Yes",
    "mental_vs_physical_Don't know",
    "mental_vs_physical_No",
    "mental_vs_physical_Yes",
    "Country_Group_Developed_Asia_Pacific",
    "Country_Group_Developing",
    "Country_Group_Other",
    "Country_Group_Western_Developed",
]


# =============================================
# ORDINAL / BINARY MAPS (from notebook 02)
# =============================================

BINARY_YES_NO = {"Yes": 1, "No": 0}

WORK_INTERFERE_MAP = {
    "Never": 0,
    "Rarely": 1,
    "Sometimes": 2,
    "Often": 3,
    "Unknown": -1,
}

NO_EMPLOYEES_MAP = {
    "1-5": 0,
    "6-25": 1,
    "26-100": 2,
    "100-500": 3,
    "500-1000": 4,
    "More than 1000": 5,
}

SEEK_HELP_MAP = {
    "No": 0,
    "Don't know": 1,
    "Yes": 2,
}

LEAVE_MAP = {
    "Very easy": 0,
    "Somewhat easy": 1,
    "Don't know": 2,
    "Somewhat difficult": 3,
    "Very difficult": 4,
}

THREE_LEVEL_MAP = {   # No / Maybe / Yes
    "No": 0,
    "Maybe": 1,
    "Yes": 2,
}

COWORKERS_MAP = {     # No / Some of them / Yes
    "No": 0,
    "Some of them": 1,
    "Yes": 2,
}


# =============================================
# COUNTRY GROUPING (from notebook 02)
# =============================================

COUNTRY_GROUP_MAP = {
    "Western Developed": "Western_Developed",
    "Developed Asia Pacific": "Developed_Asia_Pacific",
    "Developing": "Developing",
    "Other": "Other",
}


def preprocess_input(data: dict) -> pd.DataFrame:
    """
    Take raw questionnaire answers (dict) and return a
    38-column DataFrame in the EXACT column order / encoding
    used during training. The caller should then apply
    scaler.transform() on this DataFrame.
    """

    row = {}

    # --- Numeric ---
    row["Age"] = int(data["age"])

    # --- Binary columns (Yes=1, No=0) ---
    row["self_employed"]  = BINARY_YES_NO[data["self_employed"]]
    row["family_history"] = BINARY_YES_NO[data["family_history"]]
    row["remote_work"]    = BINARY_YES_NO[data["remote_work"]]
    row["tech_company"]   = BINARY_YES_NO[data["tech_company"]]
    row["obs_consequence"] = BINARY_YES_NO[data["obs_consequence"]]

    # --- Ordinal columns ---
    row["work_interfere"]           = WORK_INTERFERE_MAP[data["work_interfere"]]
    row["no_employees"]             = NO_EMPLOYEES_MAP[data["no_employees"]]
    row["seek_help"]                = SEEK_HELP_MAP[data["seek_help"]]
    row["leave"]                    = LEAVE_MAP[data["leave"]]
    row["mental_health_consequence"] = THREE_LEVEL_MAP[data["mental_health_consequence"]]
    row["phys_health_consequence"]  = THREE_LEVEL_MAP[data["phys_health_consequence"]]
    row["coworkers"]                = COWORKERS_MAP[data["coworkers"]]
    row["supervisor"]               = COWORKERS_MAP[data["supervisor"]]
    row["mental_health_interview"]  = THREE_LEVEL_MAP[data["mental_health_interview"]]
    row["phys_health_interview"]    = THREE_LEVEL_MAP[data["phys_health_interview"]]

    # --- One-hot: Gender ---
    gender = data["gender"]  # Male / Female / Other
    row["Gender_Female"] = 1 if gender == "Female" else 0
    row["Gender_Male"]   = 1 if gender == "Male"   else 0
    row["Gender_Other"]  = 1 if gender == "Other"  else 0

    # --- One-hot: care_options ---
    care = data["care_options"]   # Yes / No / Not sure
    row["care_options_No"]       = 1 if care == "No"       else 0
    row["care_options_Not sure"] = 1 if care == "Not sure" else 0
    row["care_options_Yes"]      = 1 if care == "Yes"      else 0

    # --- One-hot: benefits ---
    ben = data["benefits"]  # Yes / No / Don't know
    row["benefits_Don't know"] = 1 if ben == "Don't know" else 0
    row["benefits_No"]         = 1 if ben == "No"         else 0
    row["benefits_Yes"]        = 1 if ben == "Yes"        else 0

    # --- One-hot: wellness_program ---
    wp = data["wellness_program"]
    row["wellness_program_Don't know"] = 1 if wp == "Don't know" else 0
    row["wellness_program_No"]         = 1 if wp == "No"         else 0
    row["wellness_program_Yes"]        = 1 if wp == "Yes"        else 0

    # --- One-hot: anonymity ---
    anon = data["anonymity"]
    row["anonymity_Don't know"] = 1 if anon == "Don't know" else 0
    row["anonymity_No"]         = 1 if anon == "No"         else 0
    row["anonymity_Yes"]        = 1 if anon == "Yes"        else 0

    # --- One-hot: mental_vs_physical ---
    mvp = data["mental_vs_physical"]
    row["mental_vs_physical_Don't know"] = 1 if mvp == "Don't know" else 0
    row["mental_vs_physical_No"]         = 1 if mvp == "No"         else 0
    row["mental_vs_physical_Yes"]        = 1 if mvp == "Yes"        else 0

    # --- One-hot: Country_Group ---
    cg_raw = data["country_group"]
    cg = COUNTRY_GROUP_MAP.get(cg_raw, "Other")
    row["Country_Group_Developed_Asia_Pacific"] = 1 if cg == "Developed_Asia_Pacific" else 0
    row["Country_Group_Developing"]             = 1 if cg == "Developing"             else 0
    row["Country_Group_Other"]                  = 1 if cg == "Other"                  else 0
    row["Country_Group_Western_Developed"]      = 1 if cg == "Western_Developed"      else 0

    # Build DataFrame in exact column order
    df = pd.DataFrame([row], columns=FEATURE_COLUMNS)
    return df
