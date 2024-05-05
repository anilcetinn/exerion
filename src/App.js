// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js"; // Home bileşenini içe aktarıyoruz

import Topbar from "./components/TopBar";

const App = () => {
  return (
    <Router>
      <div>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home></Home>} />{" "}
          {/* "/"" rotası için Home bileşeni */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
