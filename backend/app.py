from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    print("recieved")
    data = request.json
    data = {k.lower(): v for k, v in data.items()}

    feature_order = [
        'fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides',
        'free sulfur dioxide', 'total sulfur dioxide', 'density', 'ph', 'sulphates', 'alcohol'
    ]

    features = [data[col] for col in feature_order]
    prediction = model.predict([features])[0]
    return jsonify({"result": "Good" if prediction == 1 else "Bad"})

if __name__ == "__main__":
    app.run(debug=True)
