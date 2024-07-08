import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: undefined,
  currentUserEmail: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// localStorage'dan oturum bilgilerini alma işlemi
const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
const storedCurrentUserEmail = localStorage.getItem("currentUserEmail");
const storedIsAuthenticated =
  localStorage.getItem("isAuthenticated") === "true";

if (storedCurrentUser && storedCurrentUserEmail && storedIsAuthenticated) {
  initialState.currentUser = storedCurrentUser;
  initialState.currentUserEmail = storedCurrentUserEmail;
  initialState.isAuthenticated = storedIsAuthenticated;
}

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const emailCheckResponse = await axios.get(
        `http://localhost:5176/api/User/checkEmail/${userData.email}`
      );
      if (emailCheckResponse.data.exists) {
        return thunkAPI.rejectWithValue("Email already exists.");
      }

      const response = await axios.post(
        "http://localhost:5176/api/User/register",
        userData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5176/api/User/login",
        userData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("http://localhost:5176/api/User/logout");
    return {};
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.errors);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.currentUserEmail = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
        // Oturum bilgilerini localStorage'a kaydetme
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        localStorage.setItem("currentUserEmail", action.payload.email);
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.currentUserEmail = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
        // Oturum bilgilerini localStorage'a kaydetme
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        localStorage.setItem("currentUserEmail", action.payload.email);
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = undefined;
        state.currentUserEmail = null;
        state.isAuthenticated = false;
        state.error = null;
        // Oturum bilgilerini localStorage'dan temizleme
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
