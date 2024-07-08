import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import { BiDumbbell } from "react-icons/bi";
import FatPercentageForm from "./FatPercentageForm"; // FatPercentageForm bileşenini ekliyoruz
import "../styles/profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isFatFormOpen, setIsFatFormOpen] = useState(false);
  const [fatPercentage, setFatPercentage] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5176/api/User/getUserByEmail/" +
            localStorage.getItem("userEmail")
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveFatPercentage = (fatPercentage) => {
    setFatPercentage(fatPercentage);
  };

  const handleOpenFatForm = () => {
    setIsFatFormOpen(true);
  };

  const handleCloseFatForm = () => {
    setIsFatFormOpen(false);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user--detail">
          <h3 className="username">
            {userInfo.firstName} {userInfo.lastName}
          </h3>
          <span className="profession">Exerionist</span>
        </div>
        <div className="user-courses">
          <div className="course">
            <div className="course-detail">
              <div className="course-cover">
                <BiDumbbell />
              </div>
              <div className="course-name">
                <h5 className="title">Boy: {userInfo.height}</h5>
                <h5 className="title">Kilo: {userInfo.weight}</h5>
                <h5 className="title">Yaş: {userInfo.age}</h5>

                {fatPercentage && (
                  <span className="value">{fatPercentage}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
