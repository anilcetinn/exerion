import React, { useState } from "react";

const BMICalculator = ({ onClose }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiValue, setBMIValue] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert("Please enter valid values for height and weight.");
      return;
    }

    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter * heightInMeter);
    setBMIValue(bmi.toFixed(2));
  };

  const handleClose = () => {
    setHeight("");
    setWeight("");
    setBMIValue(null); // Clear all fields and BMI value when closing
    onClose(); // Call the onClose prop to close the form completely
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md relative shadow-lg">
        <button
          className="button ml-80 text-gray-600 hover:text-gray-900"
          onClick={handleClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          BMI Calculation
        </h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="height"
                className="block text-gray-800 font-medium mb-2"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-gray-800 font-medium mb-2"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="button ml-4 text-gray-600 hover:text-gray-900"
              onClick={calculateBMI}
            >
              Calculate
            </button>
          </div>
        </form>
        {bmiValue !== null && (
          <div className="text-gray-800 mt-4">
            <h3>Your BMI: {bmiValue}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
