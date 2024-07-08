import React from "react";
import { BiEdit, BiLogOut } from "react-icons/bi";
import Logout from "./Logout";

const ProfileHeader = () => {
  return (
    <div className="profile--header">
      <h2 className="header--title">Profile</h2>
      <div className="edit ml-40">
        <BiEdit className="icon"></BiEdit>
      </div>
      <div className="edit">
        <Logout></Logout>
      </div>
    </div>
  );
};

export default ProfileHeader;
