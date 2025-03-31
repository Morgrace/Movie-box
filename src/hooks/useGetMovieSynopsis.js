import { useDispatch } from "react-redux";
import {
  abortLoading,
  movieSynopsisLoaded,
  requestRejected,
  searchSynopsis,
} from "../reducers/watchedMoviesSlice";
const key = "f84fc31d";
function useGetMovieSynopsis() {
  const dispatch = useDispatch();

  return async (selectedMovieId) => {
    try {
      if (!selectedMovieId) return;
      dispatch(searchSynopsis());
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
      );

      if (!response.ok)
        throw new Error(
          `Server Error: ${response.status} ${response.statusText}`
        );
      const data = await response.json();
      if (!data || data.Response === "False")
        throw new Error(`❗ ${data.Error} Try again`);
      dispatch(movieSynopsisLoaded(data));
    } catch (error) {
      if (error.name === "TypeError")
        return dispatch(requestRejected("🛑 Network Error: "));
      dispatch(requestRejected(error.message));
    } finally {
      dispatch(abortLoading());
    }
  };
}

export default useGetMovieSynopsis;
