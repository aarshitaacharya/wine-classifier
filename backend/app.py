from flask import Flask, jsonify, request
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("./backend/model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data=request.json
    features = [data[col] for col in [
        'fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides',
        'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol'
    ]]

    prediction = model.predict([features])[0]
    return jsonify({"result": "Good" if prediction == 1 else "Bad"})

if __name__ == "__main__":
    app.run(debug=True)
