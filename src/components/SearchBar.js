import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { Box } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
const SearchBar = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");

  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      setSearch("");
      setExercises(searchedExercises);
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
      <div className="mt-16 justify-center my-4">
        <Box
          className="mt-8 px-8 py-4"
          sx={{ position: "relative", width: "90%", p: "20px" }}
        >
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          ></HorizontalScrollbar>
        </Box>
      </div>
    </>
  );
};

export default SearchBar;
