from flask import Flask, jsonify, request
from flask_cors import CORS
import os, joblib

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = {k.lower(): v for k, v in request.json.items()}
    features = [data[col] for col in [
        'fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides',
        'free sulfur dioxide', 'total sulfur dioxide', 'density', 'ph', 'sulphates', 'alcohol'
    ]]
    prediction = model.predict([features])[0]
    return jsonify({"result": "Good" if prediction == 1 else "Bad"})

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
