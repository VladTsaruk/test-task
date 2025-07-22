import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${window.ENV.API_URL}/sessions`,
        userCredentials
      );
      const data = response.data;

      if (!data.token) {
        return
      }

      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid email or password"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredantials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${window.ENV.API_URL}/users`,
        userCredantials
      );
      const data = await response.data;

      if (!data.token) {
        return rejectWithValue(data.error || { message: "No token returned" });
      }

      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || "Unknown error" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser", async () => {
    localStorage.removeItem("token");
    return true;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.code;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout faild";
      });
  },
});

export default userSlice.reducer;
