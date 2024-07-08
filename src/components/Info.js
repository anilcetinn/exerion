import React from "react";

const Info = ({ userInfo }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>
        Name: {userInfo.firstName} {userInfo.lastName}
      </p>
      <p>Weight: {userInfo.weight}</p>
      <p>Height: {userInfo.height}</p>
    </div>
  );
};

export default Info;
