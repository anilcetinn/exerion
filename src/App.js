import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import UserPrograms from "./components/UserPrograms.js";
import ExampleProgram from "./components/ExampleProgram.js"; // ExampleProgram bileşenini ekliyoruz
import { useSelector } from "react-redux";
import Analyze from "./components/Analyze.js";
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/programlarim" element={<ExampleProgram />} />{" "}
      <Route
        path="/analyze"
        element={isAuthenticated ? <Analyze /> : <Navigate to="/login" />} // Analyze bileşeni için route tanımla
      />
      {/* ExampleProgram bileşeni için route tanımla */}
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
