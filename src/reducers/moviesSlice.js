import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  isLoading: false,
  movies: [],
};
const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    search(state) {
      state.isLoading = true;
      state.movies = [];
      state.error = null;
    },
    loaded(state, action) {
      state.movies = action.payload;
    },
    rejected(state, action) {
      state.error = action.payload;
    },
    abort(state) {
      state.isLoading = false;
    },
  },
});
//export the action creators
export const { search, loaded, rejected, abort } = moviesSlice.actions;
//export the reducer
export default moviesSlice.reducer;
