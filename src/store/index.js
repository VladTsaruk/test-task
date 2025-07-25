import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export default store;
