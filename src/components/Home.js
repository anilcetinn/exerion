// Home.js
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/fitness.jpg";
import SignUp from "./SignUp";
import SearchBar from "./SearchBar";
import Topbar from "./TopBar";
import Header from "./Header";
import Intro from "./Intro";

const Home = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
  };

  return (
    <div>
      <Topbar />

      <Intro></Intro>
    </div>
  );
};

export default Home;
