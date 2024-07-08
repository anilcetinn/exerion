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

const ExampleProgram = () => {
  const [exercises, setExercises] = useState([]);
  const [translatedExercises, setTranslatedExercises] = useState([]);

  const translateText = async (text, targetLanguage = "tr") => {
    const apiKey = "AIzaSyAofg9mAI5q6lZk67t2EyDQva-wJJm5awo"; // Google Translate API anahtarınızı buraya yerleştirin.
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
      return text; // Hata durumunda orijinal metni döndür
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const userEmail = localStorage.getItem("userEmail");

      try {
        const response = await axios.get(
          `http://localhost:5176/api/program/userPrograms/${userEmail}`
        );
        const exercises = response.data;

        const translatedExercises = await Promise.all(
          exercises.map(async (exercise) => {
            const translatedName = await translateText(exercise.exerciseName);
            return { ...exercise, translatedName };
          })
        );

        setExercises(exercises);
        setTranslatedExercises(translatedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const translateBodyPart = (bodyPart) => {
    const translatedBodyPart = Object.keys(searchTermsDictionary).find(
      (key) => searchTermsDictionary[key] === bodyPart
    );
    return translatedBodyPart || bodyPart; // Eğer sözlükte karşılığı yoksa orijinalini döndür
  };

  const groupExercisesByBodyPart = (exercises) => {
    const groupedExercises = {};

    exercises.forEach((exercise) => {
      const { bodyPart } = exercise;
      const translatedBodyPart = translateBodyPart(bodyPart);
      if (!groupedExercises[translatedBodyPart]) {
        groupedExercises[translatedBodyPart] = [];
      }
      groupedExercises[translatedBodyPart].push(exercise);
    });

    return groupedExercises;
  };

  const groupedExercises = groupExercisesByBodyPart(translatedExercises);

  return (
    <div className="exercise-table">
      {Object.entries(groupedExercises).map(([bodyPart, exercises]) => (
        <div key={bodyPart} className="exercise-group">
          <h2 className="body-part-title">{bodyPart}</h2>
          <table className="exercise-list">
            <thead>
              <tr>
                <th>Egzersiz</th>
                <th>Hedef</th>
                <th>Resim</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td>{exercise.translatedName}</td>
                  <td>{bodyPart}</td>
                  <td>
                    <img
                      src={exercise.gifUrl}
                      alt={exercise.exerciseName}
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
  );
};

export default ExampleProgram;
