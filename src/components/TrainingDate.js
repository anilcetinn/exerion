import React from "react";
import "../styles/trainingDate.css";
import { BiDumbbell } from "react-icons/bi";

const trainings = [
  {
    icon: <BiDumbbell></BiDumbbell>,
    name: "İtiş Günü!",
    duration: "1.30 Saat",
    calories: "250",
  },
  {
    icon: <BiDumbbell></BiDumbbell>,
    name: "Çekiş Günü!",
    duration: "1 Saat",
    calories: "200",
  },
  {
    icon: <BiDumbbell></BiDumbbell>,
    name: "İtiş Günü!",
    duration: "1.30 Saat",
    calories: "250",
  },
  {
    icon: <BiDumbbell></BiDumbbell>,
    name: "Çekiş Günü!",
    duration: "1 Saat",
    calories: "200",
  },
];

const TrainingDate = () => {
  return (
    <div className="training--date">
      <div className="list--header">
        <h2> Trainings</h2>
      </div>
      <div className="list--container">
        {trainings.map((training, index) => (
          <div key={index} className="list">
            <div className="training--detail">
              <BiDumbbell className="bidumbell"></BiDumbbell>
              <h2>{training.name}</h2>
            </div>
            <span>{training.duration}</span>
            <span>{training.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingDate;
