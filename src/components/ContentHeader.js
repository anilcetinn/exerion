import React from "react";
import { BiNotification, BiSearch } from "react-icons/bi";
import "../styles/content.css";
const ContentHeader = () => {
  return (
    <div className="content--header">
      <h1 className="header--title">Dashboard</h1>
      <div className="header--activity">
        <div className="search-box">
          <input type="text" placeholder="Search Anything Here..." />
          <BiSearch className=" icon"></BiSearch>
        </div>

        <div className=" notify">
          <BiNotification className="icon"></BiNotification>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
