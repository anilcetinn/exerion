import React from "react";
import "../styles/content.css";
import { BiDumbbell } from "react-icons/bi";

const courses = [
  {
    title: "BMI Hesaplama",
    icon: <BiDumbbell />,
  },
  {
    title: "Yağ Oranı Hesaplama",
    icon: <BiDumbbell />,
  },
];

const Card = ({ onCardClick }) => {
  return (
    <div className="card--container">
      {courses.map((item, index) => (
        <div
          className="card"
          key={index}
          onClick={() => onCardClick(item.title)}
        >
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
