from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes.predict import bp as predict_bp
    app.register_blueprint(predict_bp)

    @app.route('/')
    def home():
        return "Backend is running! Use /api/predict_top_crops to POST data."

    return app
