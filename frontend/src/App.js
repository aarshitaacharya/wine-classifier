import axios from "axios";
import { useState } from "react";
import 'tailwindcss/tailwind.css';

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
};

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const numericForm = {};
      for (const key in form) numericForm[key] = parseFloat(form[key]);
      const BACKEND_URL = process.env.REACT_APP_API;
      const res = await axios.post(`${BACKEND_URL}/predict`, numericForm);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Error");
    }
  };

  const fillExample = (type) => {
    setForm(type === "good" ? goodWine : badWine);
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-[#5d0e41] mb-6">🍷 Wine Quality Predictor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-semibold mb-1">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  step="any"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d0e41]"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 bg-[#5d0e41] text-white py-2 px-6 rounded-lg hover:bg-[#4a0c35] transition"
          >
            Predict Quality
          </button>
          {result && (
            <div className="mt-4 text-xl font-medium">
              Result: {result === "Good" ? "Good Wine 🍷" : "Bad Wine 🙁"}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 bg-[#a34343] text-white p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold mb-4">💡 Example Values</h4>
            <button
              onClick={() => fillExample("good")}
              className="w-full mb-3 bg-white text-[#a34343] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              Prefill Good Wine
            </button>
            <button
              onClick={() => fillExample("bad")}
              className="w-full bg-white text-[#a34343] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              Prefill Bad Wine
            </button>
          </div>
          <p className="mt-8 text-sm italic opacity-70">Wine predictions powered by Aarshita 🍇</p>
        </div>
      </div>
    </div>
  );
}

export default App;
