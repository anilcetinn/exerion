import React, { useState } from "react";
import ContentHeader from "./ContentHeader";
import "../styles/content.css";
import Card from "./Card.js";
import TrainingDate from "./TrainingDate.js";
import BMIForm from "./BMIForm";
import FatPercentageForm from "./FatPercentageForm.js";

const Content = () => {
  const [showBMIForm, setShowBMIForm] = useState(false);
  const [showFatPercentageForm, setShowFatPercentageForm] = useState(false);

  const handleCardClick = (cardTitle) => {
    if (cardTitle === "BMI Hesaplama") {
      setShowBMIForm(true);
    } else if (cardTitle === "Yağ Oranı Hesaplama") {
      setShowFatPercentageForm(true);
    }
  };

  const handleCloseForms = () => {
    setShowBMIForm(false);
    setShowFatPercentageForm(false);
  };

  return (
    <div className="content">
      <ContentHeader />
      <Card onCardClick={handleCardClick} />

      {showBMIForm && <BMIForm onClose={handleCloseForms} />}
      {showFatPercentageForm && (
        <FatPercentageForm onClose={handleCloseForms} />
      )}
    </div>
  );
};

export default Content;
