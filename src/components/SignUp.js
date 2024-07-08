import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/reducers/auth";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      { value: email, message: "Please enter your email." },
      { value: password, message: "Please enter your password." },
      { value: firstName, message: "Please enter your first name." },
      { value: lastName, message: "Please enter your last name." },
      { value: birthDate, message: "Please enter your birth date." },
      { value: weight, message: "Please enter your weight." },
      { value: height, message: "Please enter your height." },
      { value: age, message: "Please enter your age." },
    ];

    for (const field of fields) {
      if (!field.value) {
        setErrorMessage(field.message);
        return;
      }
    }

    try {
      // Check if email already exists in the database and verification status
      const emailCheckResponse = await axios.get(
        `http://localhost:5176/api/User/checkEmail/${email}`
      );

      if (
        emailCheckResponse.data.exists &&
        emailCheckResponse.data.isVerified
      ) {
        setErrorMessage("Email already exists and is verified.");
        setSuccessMessage("");
        return;
      }

      if (
        emailCheckResponse.data.exists &&
        !emailCheckResponse.data.isVerified
      ) {
        // Email exists but is not verified, resend verification code
        await axios.post(
          `http://localhost:5176/api/User/sendVerificationCode`,
          `"${email}"`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setErrorMessage("");
        setSuccessMessage("Verification code sent again.");
        setIsVerifying(true);
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setErrorMessage("An error occurred while checking email.");
      return;
    }

    dispatch(
      register({
        email,
        password,
        firstName,
        lastName,
        birthDate,
        height,
        weight,
        age,
      })
    ).then((action) => {
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("userEmail", email);

      axios
        .post(
          "http://localhost:5176/api/User/sendVerificationCode",
          `"${email}"`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setIsVerifying(true);
          setSuccessMessage("Verification code sent to your email.");
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Error sending verification code:", error);
          setErrorMessage("An error occurred while sending verification code.");
        });
    });
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5176/api/User/verifyCode",
        { email, code: verificationCode }
      );

      localStorage.setItem("accessToken", response.data.token);
      setSuccessMessage("Verification successful!");
      setErrorMessage("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error verifying code:", error);
      setErrorMessage("Invalid verification code.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        {!isVerifying ? (
          <>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Sign Up
            </h2>
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="birthDate">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="weight">
                  Weight
                </label>
                <input
                  type="text"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="height">
                  Height
                </label>
                <input
                  type="text"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Verify Your Email
            </h2>
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            <form onSubmit={handleVerifyCode}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="verificationCode"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
