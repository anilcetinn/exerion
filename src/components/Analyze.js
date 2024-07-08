import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/exampleprogram.css";

const searchTermsDictionary = {
  "omuz": "shoulder",
  "göğüs": "chest",
  "sırt": "back",
  "üst kol": "upper arms",
  "alt kol": "lower arms",
  "üst bacak": "upper legs",
  "alt bacak": "lower legs",
  "bel": "waist",
  "kardiyo": "cardio",
};

const skinny = ["0974", "0198", "0171", "0493", "0091", "0192", "1630", "0176"];
const ideal = [
  "0027",
  "0049",
  "0064",
  "0289",
  "0314",
  "0375",
  "0091",
  "0192",
  "0203",
  "0023",
  "0070",
  "0109",
  "0860",
];
const fat = [
  "2144",
  "1270",
  "0017",
  "0049",
  "0978",
  "0997",
  "0019",
  "0089",
  "3666",
];

const ExampleProgram = () => {
  const [exercises, setExercises] = useState([]);
  const [translatedExercises, setTranslatedExercises] = useState([]);
  const [userWeight, setUserWeight] = useState(null);
  const [userHeight, setUserHeight] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);

  const translateText = async (text, targetLanguage = "tr") => {
    const apiKey = "AIzaSyAofg9mAI5q6lZk67t2EyDQva-wJJm5awo"; // Google Translate API key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const body = {
      q: text,
      target: targetLanguage,
      format: "text",
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (
        response.data &&
        response.data.data &&
        response.data.data.translations
      ) {
        return response.data.data.translations[0].translatedText;
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Return original text in case of error
    }
  };

  const fetchUserWeightAndHeight = async (userEmail) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `http://localhost:5176/api/User/getuserweightandheight/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserWeight(response.data.weight);
      setUserHeight(response.data.height);
    } catch (error) {
      console.error("Error fetching user weight and height:", error);
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      fetchUserWeightAndHeight(userEmail);
    }
  }, []);

  useEffect(() => {
    if (userWeight && userHeight) {
      const heightInMeters = userHeight / 100;
      const bmiValue = userWeight / (heightInMeters * heightInMeters);

      if (bmiValue < 18.5) {
        setBmiCategory("skinny");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiCategory("ideal");
      } else {
        setBmiCategory("fat");
      }
    }
  }, [userWeight, userHeight]);

  useEffect(() => {
    const fetchExercises = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "3b2aa5a152mshb8767d005eeea32p1cd2c3jsn98b987723fee",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        let selectedExerciseIds = [];
        if (bmiCategory === "skinny") {
          selectedExerciseIds = skinny;
        } else if (bmiCategory === "ideal") {
          selectedExerciseIds = ideal;
        } else if (bmiCategory === "fat") {
          selectedExerciseIds = fat;
        }

        const fetchedExercises = await Promise.all(
          selectedExerciseIds.map(async (id) => {
            const response = await axios.get(
              `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
              options
            );
            return response.data;
          })
        );

        const translatedExercises = await Promise.all(
          fetchedExercises.map(async (exercise) => {
            const translatedName = await translateText(exercise.name);
            const translatedBodyPart = translateBodyPart(exercise.bodyPart);
            return { ...exercise, translatedName, translatedBodyPart };
          })
        );

        setExercises(fetchedExercises);
        setTranslatedExercises(translatedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    if (bmiCategory) {
      fetchExercises();
    }
  }, [bmiCategory]);

  const translateBodyPart = (bodyPart) => {
    const translatedBodyPart = Object.keys(searchTermsDictionary).find(
      (key) => searchTermsDictionary[key] === bodyPart
    );
    return translatedBodyPart || bodyPart;
  };

  const groupExercisesByBodyPart = (exercises) => {
    const groupedExercises = {};

    exercises.forEach((exercise) => {
      const { translatedBodyPart } = exercise;
      if (!groupedExercises[translatedBodyPart]) {
        groupedExercises[translatedBodyPart] = [];
      }
      groupedExercises[translatedBodyPart].push(exercise);
    });

    return groupedExercises;
  };

  const groupedExercises = groupExercisesByBodyPart(translatedExercises);

  const getBMIStatusMessage = () => {
    if (bmiCategory === "skinny") {
      return "Your BMI indicates that you are underweight.";
    } else if (bmiCategory === "ideal") {
      return "Your BMI indicates that you are at an ideal weight.";
    } else if (bmiCategory === "fat") {
      return "Your BMI indicates that you are overweight.";
    } else {
      return "BMI category not determined.";
    }
  };

  return (
    <div>
      <h2>{getBMIStatusMessage()}</h2>
      <div className="exercise-table">
        {Object.entries(groupedExercises).map(([bodyPart, exercises]) => (
          <div key={bodyPart} className="exercise-group">
            <h2 className="body-part-title">{bodyPart}</h2>
            <table className="exercise-list">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Target</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{exercise.translatedName}</td>
                    <td>{exercise.translatedBodyPart}</td>
                    <td>
                      <img
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        className="exercise-image"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleProgram;
