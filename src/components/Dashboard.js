import React from "react";
import SideBar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";
import "../styles/dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar></SideBar>
      <div className="dashboard--content">
        <Content></Content>
        <Profile></Profile>
      </div>
    </div>
  );
};

export default Dashboard;
