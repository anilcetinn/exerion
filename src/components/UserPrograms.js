import { fetchUserPrograms } from "../store/reducers/programSlice";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserPrograms = () => {
  const dispatch = useDispatch();
  const currentUserEmail = useSelector((state) => state.auth.currentUserEmail);
  const userPrograms = useSelector((state) => state.program.programs);

  useEffect(() => {
    if (currentUserEmail) {
      dispatch(fetchUserPrograms(currentUserEmail));
    }
  }, [currentUserEmail, dispatch]);

  return (
    <div>
      <h1>User Programs</h1>
      {userPrograms.map((program) => (
        <div key={program.id} className="program-card">
          <h2>{program.name}</h2>
          <p>Duration: {program.duration}</p>
          <p>Calories: {program.calories}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPrograms;
