import React from "react";

const ExerciseCard = ({ exercise, handleCheckboxChange, isSelected }) => {
  return (
    <div className="exercise-card border p-4 rounded-lg shadow">
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="w-full h-32 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{exercise.name}</h3>
      <p className="text-gray-600">{exercise.target}</p>
      <p className="text-gray-600">{exercise.equipment}</p>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleCheckboxChange(exercise)}
        className="mt-2"
      />
    </div>
  );
};

export default ExerciseCard;
