import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExerciseCard from "./ExerciseCard";
import "../styles/programForm.css";

const ProgramForm = ({ onClose }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [existingProgram, setExistingProgram] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const checkExistingProgram = async () => {
      const userEmail = currentUser.email;

      try {
        const response = await fetch(
          `http://localhost:5176/api/program/userPrograms/${userEmail}`
        );
        if (response.ok) {
          const result = await response.json();
          setExistingProgram(result.length > 0);
        } else {
          throw new Error("Failed to check existing programs.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkExistingProgram();
  }, [currentUser.email]);

  const searchTermsDictionary = {
    "omuz": "shoulder",
    "göğüs": "chest",
    "sırt": "back",
    "üst kollar": "upper arms",
    "alt kollar": "lower arms",
    "üst bacaklar": "upper legs",
    "alt bacaklar": "lower legs",
    "bel": "waist",
    "kardiyo": "cardio",
  };

  const translateSearchTerm = async (text) => {
    const apiKey = "AIzaSyAofg9mAI5q6lZk67t2EyDQva-wJJm5awo"; // Doğru API anahtarını buraya yerleştirin.
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const body = {
      q: text,
      source: "tr",
      target: "en",
      format: "text",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to translate text");
      }

      const result = await response.json();
      return result.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Hata durumunda orijinal metni döndür
    }
  };

  const translateExercise = async (text) => {
    const apiKey = "AIzaSyAofg9mAI5q6lZk67t2EyDQva-wJJm5awo";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "tr",
        format: "text",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result.data.translations[0].translatedText;
  };

  const handleBodyPartClick = async (bodyPart) => {
    setSelectedBodyPart(bodyPart);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3b2aa5a152mshb8767d005eeea32p1cd2c3jsn98b987723fee",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=30`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Translate exercises to Turkish
      const translatedExercises = await Promise.all(
        result.map(async (exercise) => {
          const translatedName = await translateExercise(exercise.name);
          return { ...exercise, name: translatedName };
        })
      );

      setExercises(
        Array.isArray(translatedExercises) ? translatedExercises : []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (exercise) => {
    if (selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSave = async () => {
    if (!selectedExercises.length) {
      alert("Please select at least one exercise to save.");
      return;
    }

    if (existingProgram) {
      const confirmDelete = window.confirm(
        "You already have a saved program. Do you want to delete your existing program and save a new one?"
      );
      if (!confirmDelete) {
        return;
      }
    }

    const programData = {
      userEmail: currentUser.email,
      exercises: selectedExercises.map((exercise) => ({
        exerciseName: exercise.name,
        gifUrl: exercise.gifUrl,
        bodyPart: exercise.bodyPart,
      })),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    };

    try {
      const response = await fetch(
        "http://localhost:5176/api/program/register",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to save the program.");
      } else {
        const result = await response.json();
        console.log("Program saved successfully:", result.message);
        alert("Program saved successfully!");
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save the program.");
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      // Search termi İngilizceye çevir
      const translatedSearchTerm = await translateSearchTerm(searchTerm);

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "3b2aa5a152mshb8767d005eeea32p1cd2c3jsn98b987723fee", // Doğru RapidAPI anahtarınızı buraya yerleştirin.
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(
        translatedSearchTerm
      )}?limit=10`;

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        // Translate exercises to Turkish
        const translatedExercises = await Promise.all(
          result.map(async (exercise) => {
            const translatedName = await translateExercise(exercise.name);
            return { ...exercise, name: translatedName };
          })
        );

        setExercises(
          Array.isArray(translatedExercises) ? translatedExercises : []
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl relative shadow-lg overflow-y-auto max-h-full">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Yeni Program Oluştur
        </h2>
        <div className="search-bar mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Egzersiz ara..."
            className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          >
            Ara
          </button>
        </div>
        <div className="body-parts flex justify-around mb-4">
          <button onClick={() => handleBodyPartClick("chest")}>Göğüs</button>
          <button onClick={() => handleBodyPartClick("shoulders")}>Omuz</button>
          <button onClick={() => handleBodyPartClick("back")}>Back</button>
          <button onClick={() => handleBodyPartClick("upper arms")}>
            Üst Kol
          </button>
          <button onClick={() => handleBodyPartClick("lower arms")}>
            Alt Kol
          </button>
          <button onClick={() => handleBodyPartClick("upper legs")}>
            Üst Bacak
          </button>
          <button onClick={() => handleBodyPartClick("lower legs")}>
            Alt Bacak
          </button>
          <button onClick={() => handleBodyPartClick("waist")}>Bel</button>
          <button onClick={() => handleBodyPartClick("cardio")}>Kardiyo</button>
        </div>
        <div className="exercises grid grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              handleCheckboxChange={handleCheckboxChange}
              isSelected={selectedExercises.some((e) => e.id === exercise.id)}
            />
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default ProgramForm;
