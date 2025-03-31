import { createSlice } from "@reduxjs/toolkit";
const getMoviesFromStorage = function () {
  const stored = localStorage.getItem("watchedMovies");
  return stored ? JSON.parse(stored) : [];
};
const initialState = {
  selectedMovie: [],
  watchedMovies: getMoviesFromStorage(),
  movieSynopsis: {},
  isLoading: false,
  error: null,
};
const watchedMoviesSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    resetSelect(state) {
      state.selectedMovie = [];
    },
    searchSynopsis(state) {
      state.error = null;
      state.isLoading = true;
    },
    movieSelected(state, action) {
      state.selectedMovie = action.payload;
    },
    movieSynopsisLoaded(state, action) {
      state.movieSynopsis = action.payload;
    },
    movieAdded: {
      prepare(watchedMovie) {
        const watchedMovieList = getMoviesFromStorage();
        const updateWatchedMovieList = [...watchedMovieList, watchedMovie];

        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updateWatchedMovieList)
        );
        return { payload: watchedMovie };
      },
      reducer(state, action) {
        state.watchedMovies.push(action.payload);
        state.selectedMovie = [];
      },
    },
    movieDeleted: {
      prepare(movieID) {
        const watchedMovieList = getMoviesFromStorage();
        const updateWatchedMovieList = watchedMovieList.filter(
          (mov) => mov.imdbID !== movieID
        );
        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updateWatchedMovieList)
        );
        return { payload: movieID };
      },
      reducer(state, action) {
        state.watchedMovies = state.watchedMovies.filter(
          (mov) => mov.imdbID !== action.payload
        );
      },
    },
    movieUnselect(state) {
      state.selectedMovie = [];
    },
    requestRejected(state, action) {
      state.error = action.payload;
    },
    abortLoading(state) {
      state.isLoading = false;
    },
  },
});
export const {
  searchSynopsis,
  movieSelected,
  movieSynopsisLoaded,
  requestRejected,
  abortLoading,
  movieAdded,
  movieDeleted,
  movieUnselect,
  resetSelect,
} = watchedMoviesSlice.actions;
export default watchedMoviesSlice.reducer;
