import React, { useState } from "react";

const FatPercentageForm = ({ onClose }) => {
  const [weight, setWeight] = useState("");
  const [waistCircumference, setWaistCircumference] = useState("");
  const [hipCircumference, setHipCircumference] = useState("");
  const [neckCircumference, setNeckCircumference] = useState("");
  const [fatPercentage, setFatPercentage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hesaplama yapılacak formüller buraya eklenecek
    const weightInKg = parseFloat(weight) * 0.453592; // pound'u kilograma çevirme
    const waistInCm = parseFloat(waistCircumference); // direk santimetreyi alıyoruz
    const hipInCm = parseFloat(hipCircumference); // direk santimetreyi alıyoruz
    const neckInCm = parseFloat(neckCircumference); // direk santimetreyi alıyoruz

    // Sayısal değilse veya değer yoksa işlemi durdur
    if (
      isNaN(weightInKg) ||
      isNaN(waistInCm) ||
      isNaN(hipInCm) ||
      isNaN(neckInCm)
    ) {
      alert("Please enter valid numerical values for all fields.");
      return;
    }

    // Yağ yüzdesi hesaplama formülü
    const fatPercentage =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistInCm - neckInCm) +
          0.15456 * Math.log10(hipInCm)) -
      450;

    // Hesaplanan yağ yüzdesini state'e kaydetme
    setFatPercentage(fatPercentage.toFixed(2));

    // onSave fonksiyonunu çağırarak yağ yüzdesi bilgisini profile bileşenine iletiyoruz
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md relative shadow-lg">
        <button
          className="button ml-80 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Fat Percentage Calculator
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label
                htmlFor="waistCircumference"
                className="block text-gray-800 font-medium mb-2"
              >
                Waist Circumference (cm)
              </label>
              <input
                type="number"
                id="waistCircumference"
                name="waistCircumference"
                placeholder="Waist Circumference"
                value={waistCircumference}
                onChange={(e) => setWaistCircumference(e.target.value)}
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hipCircumference"
                className="block text-gray-800 font-medium mb-2"
              >
                Hip Circumference (cm)
              </label>
              <input
                type="number"
                id="hipCircumference"
                name="hipCircumference"
                placeholder="Hip Circumference"
                value={hipCircumference}
                onChange={(e) => setHipCircumference(e.target.value)}
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="neckCircumference"
                className="block text-gray-800 font-medium mb-2"
              >
                Neck Circumference (cm)
              </label>
              <input
                type="number"
                id="neckCircumference"
                name="neckCircumference"
                placeholder="Neck Circumference"
                value={neckCircumference}
                onChange={(e) => setNeckCircumference(e.target.value)}
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus
focus
"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="button ml-4 text-gray-600 hover:text-gray-900"
            >
              Calculate
            </button>
            {/* Save butonunu ekleyelim */}
          </div>
        </form>
        {fatPercentage !== null && (
          <div className="text-gray-800 mt-4">
            <h3>Fat Percentage: {fatPercentage}%</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FatPercentageForm;
