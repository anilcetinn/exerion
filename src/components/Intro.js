import React, { useState, useEffect } from "react";
import Header from "./Header";
import SignUp from "./SignUp";
import introImg from "../assets/parts-dumbbell-gray.jpg";
import SearchBar from "./SearchBar";

export default function EventsIntroSection() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("");

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <>
      <section
        className="content-section"
        id="overview-section"
        style={{ backgroundImage: `url(${introImg})` }}
      >
        <Header />
        <h2>
          Enerjik hissetmek, zinde kalmak ve yaşamınızı daha iyi bir hale
          getirmek için
          <br />
          <p>bugün bir adım atın.</p>
        </h2>

        <p>
          <button className="button" onClick={handleSignUpClick}>
            Kaydolun ve siz de harekete geçin!
          </button>
        </p>
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
        <SearchBar
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </section>
    </>
  );
}
