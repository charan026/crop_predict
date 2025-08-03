import json
from backend import app  

def test_predict(client):
    sample = {
        "Area": 1000,
        "Rainfall": 800,
        "Fertilizer": 100,
        "Pesticide": 20,
    }
    response = client.post("/api/predict", json=sample)
    assert response.status_code == 200
    assert "predicted_yield" in response.json
