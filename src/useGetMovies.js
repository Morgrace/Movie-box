import { useEffect, useState } from "react";
const useGetMovies = function (query) {
  const key = "f84fc31d";
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      (async function () {
        try {
          setErr("");
          setIsLoading(true);
          setMovies([]);
          if (query.length < 4) return;
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
          setMovies(data.Search);
        } catch (error) {
          if (error.name === "TypeError") return setErr("🛑 Network Error: ");
          if (error.name !== "AbortError") {
            setErr(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      })();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { err, isLoading, movies };
};
export { useGetMovies };
