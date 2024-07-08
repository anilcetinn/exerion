import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import "../styles/profile.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return <BiLogOut onClick={handleLogout} className="icon "></BiLogOut>;
};

export default Logout;
