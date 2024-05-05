import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/gym.png";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? "4px solid #ff2625" : "",

        borderBottomLeftRadius: "60px",
        width: "180px",
        height: "70px",
        cursor: "pointer",
        gap: "47px",
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        styles={{ width: "40px", height: "40px" }}
      ></img>
    </Stack>
  );
};

export default BodyPart;
