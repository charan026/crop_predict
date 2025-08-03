from flask import Blueprint, request, jsonify
from joblib import load
import pandas as pd
from config import Config

bp = Blueprint('predict', __name__)

model, label_enc = load(Config.MODEL_PATH)

crop_descriptions = {
    "wheat": "Wheat is a vital cereal grain widely cultivated across temperate regions, used for bread, pasta, cereal, and other staple foods.",
    "rice": "Rice is a staple food crop for more than half the world's population and thrives in warm, water-intensive environments.",
    "maize": "Maize (corn) is a highly adaptable grain grown for food, feed, biofuel, and numerous industrial uses.",
    "soybean": "Soybean is a protein-rich legume used in oil production, animal feed, and many vegetarian products.",
    "sugarcane": "Sugarcane is a tropical grass cultivated for its high sugar content, used in sugar, ethanol, and jaggery production.",
    "cotton": "Cotton is a soft, fluffy staple fiber grown as a major cash crop for textiles, clothing, and oilseed.",
    "millet": "Millets are drought-resistant small grain crops (like pearl millet, finger millet, foxtail millet) important in arid zones for food and fodder.",
    "barley": "Barley is a hardy cereal used in bread, soups, livestock feed, and as a major component of beer and whiskey.",
    "groundnut": "Groundnut (peanut) is an oilseed legume, valued for its edible seeds and oil.",
    "chickpea": "Chickpea is a pulse crop rich in protein, essential in many traditional recipes globally.",
    "pigeonpea": "Pigeonpea is a protein-rich legume used extensively in Indian dal and as fodder."
    
}


@bp.route('/api/predict_top_crops', methods=['POST'])
def predict_top_crops():
    data = request.get_json()

    required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    if not all(field in data for field in required_fields):
        return jsonify({'error': f"Missing required fields. Required: {required_fields}"}), 400

    try:
        X_input = pd.DataFrame([{field: float(data[field]) for field in required_fields}])

        proba = model.predict_proba(X_input)[0]  

        crops = label_enc.classes_
        crop_probas = list(zip(crops, proba))

        top_crops = sorted(crop_probas, key=lambda x: x[1], reverse=True)[:3]

        top_crops_with_desc = [
            {
                "name": crop,
                "probability": round(prob, 3),
                "description": crop_descriptions.get(crop.lower(), "Description not available.")
            }
            for crop, prob in top_crops
        ]

        estimated_yield = max(proba) * 30  

        return jsonify({
            "predicted_yield": round(estimated_yield, 2),
            "top_crops": top_crops_with_desc
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


