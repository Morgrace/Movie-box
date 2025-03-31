import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { abort, loaded, rejected, search } from "../reducers/moviesSlice";

const useGetMovies = function (query) {
  const key = "f84fc31d";
  // const key = "f84fc31d";

  const dispatch = useDispatch();
  useEffect(
    function () {
      const controller = new AbortController();
      (async function () {
        try {
          if (query.length < 4) return;
          dispatch(search());
          const signal = controller.signal;
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal }
          );
          if (!response.ok)
            throw new Error(
              `Server Error: ${response.status} ${response.statusText}`
            );
          const data = await response.json();
          if (!data.Search)
            throw new Error("No Movies Found. Try a different Search");
          dispatch(loaded(data.Search));
        } catch (error) {
          if (error.name === "TypeError")
            return dispatch(
              rejected("🛑 Network Error: Check your internet connection")
            );
          if (error.name !== "AbortError") {
            dispatch(rejected(error.message));
          }
        } finally {
          dispatch(abort());
        }
      })();
      return function () {
        controller.abort();
      };
    },
    [query, dispatch]
  );
};
export { useGetMovies };
