import { useState, useRef, useEffect } from "react";
import { useKeyDown } from "../useKeyDown";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import StarRating from "../RatingStars";
const key = "2cbc474e";
const MovieDetails = function ({
  selectedMovieId,
  onCloseMovie,
  setWatched,
  watched,
}) {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [userRating, setUserRating] = useState("");

  const count = useRef(0);
  useEffect(
    function () {
      if (!userRating) return;
      count.current++;
    },
    [userRating]
  );
  const {
    Genre: genre,
    Poster: poster,
    Title: title,
    Released: released,
    Runtime: runtime,
    imdbRating,
    Director: director,
    Actors: actors,
    Plot: plot,
  } = selectedMovie;
  const haveWatched = watched.find((movie) => movie.imdbID === selectedMovieId);
  // for changing the docuement title according to selected movie
  useEffect(
    function () {
      if (!selectedMovie) return;
      document.title = `Movie | ${selectedMovie.Title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [selectedMovie]
  );
  useKeyDown("Escape", onCloseMovie);

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
        );
        if (!response.ok)
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`
          );
        const data = await response.json();

        if (!data)
          throw new Error(
            "❗ Error Selecting Movie. Try again or Select another movie"
          );
        setSelectedMovie(data);
      } catch (error) {
        if (error.name === "TypeError") return setErr("🛑 Network Error: ");
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedMovieId]);
  return (
    <div className="details">
      {isLoading && <Loading />}
      {err && <ErrorMessage>{err}</ErrorMessage>}
      {selectedMovie && !err && !isLoading && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {haveWatched ? (
                <p>You already Rated this movie ⭐ {haveWatched?.userRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRate={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        setWatched((movie) => [
                          ...movie,
                          {
                            ...selectedMovie,
                            userRating,
                            Runtime: +selectedMovie.Runtime.split(" ").at(0),
                            count: count.current,
                          },
                        ]);
                        onCloseMovie();
                      }}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
