import axios from "axios";
import { useState } from "react";

const initialForm = {
  "Fixed Acidity": "",
  "Volatile Acidity": "",
  "Citric Acid": "",
  "Residual Sugar": "",
  "Chlorides": "",
  "Free Sulfur Dioxide": "",
  "Total Sulfur Dioxide": "",
  "Density": "",
  "pH": "",
  "Sulphates": "",
  "Alcohol": ""
}

// Example values
const goodWine = {
  "Fixed Acidity": 11.3,
  "Volatile Acidity": 0.62,
  "Citric Acid": 0.67,
  "Residual Sugar": 2.0,
  "Chlorides": 0.064,
  "Free Sulfur Dioxide": 11.0,
  "Total Sulfur Dioxide": 50.0,
  "Density": 0.9988,
  "pH": 3.26,
  "Sulphates": 0.58,
  "Alcohol": 13.4
};

const badWine = {
  "Fixed Acidity": 7.4,
  "Volatile Acidity": 0.70,
  "Citric Acid": 0.00,
  "Residual Sugar": 1.9,
  "Chlorides": 0.076,
  "Free Sulfur Dioxide": 11.0,
  "Total Sulfur Dioxide": 34.0,
  "Density": 0.9978,
  "pH": 3.51,
  "Sulphates": 0.56,
  "Alcohol": 9.4
};


function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async () => {
    try{
      const numericForm = {};
      for(const key in form) numericForm[key] = parseFloat(form[key]);
      console.log("Sending to backend:", numericForm);
      const res = await axios.post("http://127.0.0.1:5000/predict", numericForm);

      setResult(res.data.result);
    }catch (err){
      console.error(err);
      setResult("Error");
    }
  }

  const fillExample = (type) => {
    setForm(type === "good" ? goodWine: badWine)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <div style={{ width: '50%' }}>
            <h2>🍷 Wine Quality Predictor</h2>
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label>{key}</label><br />
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  step="any"
                  style={{ width: "100%", marginBottom: 10 }}
                />
              </div>
            ))}
            <button onClick={handleSubmit}>Predict Quality</button>
            {result && (
              <h3 style={{ marginTop: 20 }}>
                Result: {result === "Good" ? "Good Wine 🍷" : "Bad Wine 🙁"}
              </h3>
            )}
          </div>

          {/* Right Column: Example Cloud */}
          <div style={{ width: '30%', marginLeft: 30 }}>
            <h4>💡 Example Values</h4>
            <button onClick={() => fillExample("good")} style={{ marginBottom: 10 }}>
              Good Wine
            </button><br />
            <button onClick={() => fillExample("bad")}>
              Bad Wine
            </button>
          </div>
        </div>
  );
}

export default App;
