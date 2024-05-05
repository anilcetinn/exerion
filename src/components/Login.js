import React, { useState } from "react";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Login işlemleri burada yapılabilir
    console.log("Email:", email);
    console.log("Password:", password);
    // Formu sıfırla
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md relative">
        <button
          className="button absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-lg py-2 px-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-lg py-2 px-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className=" button py-2 px-4 right-4 rounded-lg  focus:outline-none "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
