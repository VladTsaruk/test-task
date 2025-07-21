import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../utils/api.js";

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/movies`);
  return response.data.data;
});

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/movies/${movieId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch movie details");
    }
  }
);

export const importMovies = createAsyncThunk(
  "movies/importMovies",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("movies", file);

      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/movies/import`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Import failed");
    }
  }
);

export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid monive data"
      );
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/movies/${movieData}`
      );

      if (response.data.status === 1) {
        return movieData;
      } else {
        return rejectWithValue("Delete failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Delete failed");
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const { id, ...movieDetails } = movieData;
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/movies/${id}`,
        movieDetails
      );

      if (response.data.status === 1) {
        return response.data.data;
      } else {
        return rejectWithValue("Update failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Update failed");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filtered: [],
    currentMovie: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // getMovies
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.payload;
      })

      // importMovies
      .addCase(importMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload];
      })
      .addCase(importMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addMovie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteMovie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((movie) => movie.id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // getMovieById
      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // updateMovie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        // Update the movie in the list
        state.list = state.list.map(movie => 
          movie.id === action.payload.id ? action.payload : movie
        );
        // Update currentMovie if it's the same movie
        if (state.currentMovie && state.currentMovie.id === action.payload.id) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
