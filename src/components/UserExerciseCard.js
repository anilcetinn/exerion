import React from "react";

const UserExerciseCard = ({ exercise, handleCheckboxChange, isSelected }) => {
  return (
    <div className="exercise-card border p-4 rounded-lg shadow">
      <img
        src={exercise.gifUrl}
        alt={exercise.exerciseName}
        className="w-full h-32 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{exercise.exerciseName}</h3>
      {/* Egzersiz adını göstermek için */}
      <p className="text-gray-600">{exercise.target}</p>
      <p className="text-gray-600">{exercise.equipment}</p>
    </div>
  );
};

export default UserExerciseCard;
