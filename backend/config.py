import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Config:
    DATA_PATH = os.path.join(BASE_DIR, "data", "crop_recommendation_dataset.csv")
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "crop_recommendation_model.joblib")



