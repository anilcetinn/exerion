import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login", email, password);
    dispatch(
      login({
        email,
        password,
      })
    )
      .then((action) => {
        if (action.type === "auth/login/fulfilled") {
          localStorage.setItem("accessToken", action.payload.token);
          localStorage.setItem("userEmail", email);
          setSuccessMessage("Login successful!");
          setErrorMessage("");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid email or password.");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again later.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="mr-16 bg-white rounded-lg p-8 max-w-md relative shadow-lg left-10">
        <button
          className="button ml-48 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="button py-2 px-4 right-4 rounded-lg focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
