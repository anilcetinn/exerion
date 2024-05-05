// Home.js
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/fitness.jpg";
import SignUp from "./SignUp";
import SearchBar from "./SearchBar";

const Home = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-50">
            Exerion'a hoş geldiniz!
          </h1>
          <button
            onClick={handleOpenSignUp}
            className="button mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Sağlıklı bir yaşam için egzersizlerinizi düzenlemeye hazır mısınız?
          </button>
          {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
          <SearchBar
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            className="mt-8"
          ></SearchBar>
        </div>
      </div>
    </>
  );
};

export default Home;
