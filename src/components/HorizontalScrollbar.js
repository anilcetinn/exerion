import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Typography } from "@mui/material";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <ScrollMenu>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemID={item.id || item}
        title={item.id || item}
        m="0 20px"
      ></Box>
    ))}
  </ScrollMenu>
);

export default HorizontalScrollbar;
