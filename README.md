# 🌾 Crop Yield Prediction Web App

An intelligent web application that predicts crop yield and suggests the top 3 most suitable crops based on soil nutrients and weather conditions using a Machine Learning model.

![App Screenshot](https://cropye.netlify.app/preview.png) 

- **Frontend** (Netlify): [https://cropye.netlify.app](https://cropye.netlify.app)
- **Backend** (Render): [https://crop-prediction-jsze.onrender.com](https://crop-prediction-jsze.onrender.com)

## Features

- 🌱 Predicts **crop yield** based on soil and weather input
- 📊 Suggests **top 3 crops** ideal for given conditions
- 🔄 Built with **React (Vite)** frontend and **Flask** backend
- 📦 ML model trained with `scikit-learn` and deployed via `Render`
- 🌐 Fully responsive and modern UI

---

## Technologies Used

### Frontend
- React (Vite)
- Material UI (MUI)
- Axios
- Netlify (Hosting)

### Backend
- Python (Flask)
- scikit-learn, joblib
- Render (Hosting)
- CORS configured for frontend requests

---

##  Project Structure
├── backend
│ ├── app.py
│ ├── model/
│ │ └── crop_recommendation_model.joblib
│ ├── api/
│ │ └── routes.py
│ └── wsgi.py
├── client
│ ├── src/
│ │ ├── components/
│ │ │ └── YieldForm.jsx
│ │ │ └── PredictionResults.jsx
│ │ └── App.jsx
│ └── index.html
├── requirements.txt
└── README.md

📌 Deployment
Backend hosted on Render

Frontend hosted on Netlify

CORS is handled with flask-cors

✨ Author
Charan
🔗 GitHub

📜 License
This project is open source and available under the MIT License.

