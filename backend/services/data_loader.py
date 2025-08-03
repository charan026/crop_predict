import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from joblib import dump
from config import Config

def load_and_preprocess():
    df = pd.read_csv(Config.DATA_PATH)
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[features]

    le = LabelEncoder()
    y = le.fit_transform(df['label'])

    return train_test_split(X, y, test_size=0.2, random_state=42), le

def train_and_save_model():
    (X_train, X_test, y_train, y_test), label_enc = load_and_preprocess()

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    dump((model, label_enc), Config.MODEL_PATH)
    print(f"Model and label encoder saved to {Config.MODEL_PATH}")


