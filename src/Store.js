import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/moviesSlice";
import watchedMoviesReducer from "./reducers/watchedMoviesSlice";
import mobileResponsiveReducer from "./reducers/mobileResponseSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watched: watchedMoviesReducer,
    mobile: mobileResponsiveReducer,
  },
});
