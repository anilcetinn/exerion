import React, { useState } from "react";

function SignUp({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    weight: "",
    height: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // SignUp işlemleri burada yapılabilir
    console.log("Form Data:", formData);
    // Formu sıfırla
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      weight: "",
      height: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md relative shadow-lg">
        <button
          className="button absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-800 font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-800 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="birthDate"
                className="block text-gray-800 font-medium mb-2"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-gray-800 font-medium mb-2"
              >
                Weight
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="height"
                className="block text-gray-800 font-medium mb-2"
              >
                Height
              </label>
              <input
                type="number"
                id="height"
                name="height"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-800 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border-2 border-gray-400 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="button absolute bottom-4 right-4 text-gray-600 hover:text-gray-900"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
