import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { Box } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
const SearchBar = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");

  const [bodyParts, setBodyParts] = useState([]);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=1500",
        exerciseOptions
      );

      console.log(exercisesData);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border text-black mt-8 ml-16 border-gray-300 px-16 py-4 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search Exercise"
        />
        <button
          onClick={handleSearch}
          className="button px-8 py-4 mt-8 text-white font-bold rounded-r-md"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
