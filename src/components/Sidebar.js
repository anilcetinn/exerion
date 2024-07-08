// Sidebar.js

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link bileşenini import et
import {
  BiBookAlt,
  BiHome,
  BiTask,
  BiDumbbell,
  BiLike,
  BiAnalyse,
} from "react-icons/bi";
import "../styles/sidebar.css";
import ProgramForm from "./ProgramForm"; // ProgramForm'u ekliyoruz

const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"></BiBookAlt>
        <div className="exerion">Exerion</div>
      </div>
      <div className="menu--list">
        <Link to="/programlarim" className="item">
          {" "}
          {/* Link kullanarak UserProgram bileşenine yönlendir */}
          <BiDumbbell className="icon"></BiDumbbell>
          Programlarım
        </Link>
        <a href="#" className="item" onClick={() => setShowForm(true)}>
          <BiTask className="icon"></BiTask>
          Yeni program oluştur
        </a>
        <Link to="/analyze" className="item">
          <BiAnalyse className="icon"></BiAnalyse>
          Beni analiz et!
        </Link>
      </div>
      {showForm && <ProgramForm onClose={() => setShowForm(false)} />}{" "}
      {/* ProgramForm'u göster */}
    </div>
  );
};

export default Sidebar;
