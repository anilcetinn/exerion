import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userPrograms: [],
};

export const fetchUserPrograms = createAsyncThunk(
  "programs/fetchUserPrograms",
  async (userEmail, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5176/api/Program/userPrograms/${userEmail}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const programSlice = createSlice({
  name: "program",
  initialState: {
    programs: [], // programs state'i boş bir dizi olarak başlatılır
  },
  reducers: {
    setPrograms(state, action) {
      state.programs = action.payload; // programları set etmek için bir reducer
    },
  },
});

export const { setPrograms } = programSlice.actions;

export default programSlice.reducer;
