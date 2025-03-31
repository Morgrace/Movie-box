import { useState, useRef, useEffect } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import StarRating from "./RatingStars";
import { useDispatch, useSelector } from "react-redux";

import { movieAdded, movieUnselect } from "../reducers/watchedMoviesSlice";

const MovieDetails = function () {
  const [userRating, setUserRating] = useState("");
  const count = useRef(0);

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
    imdbID,
  } = useSelector((store) => store.watched.movieSynopsis);

  const listItemToBeAdded = {
    poster,
    title,
    imdbRating,
    userRating,
    runtime: Number.parseFloat(runtime),
    imdbID,
  };
  const { isLoading, error, selectedMovie, watchedMovies, movieSynopsis } =
    useSelector((store) => store.watched);
  const dispatch = useDispatch();
  const haveWatched = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovie
  );
  //for changing the docuement title according to selected movie
  useEffect(
    function () {
      if (!Object.keys(movieSynopsis).length) return;
      document.title = `Movie | ${movieSynopsis.Title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movieSynopsis]
  );
  // useKeyDown("Escape", onCloseMovie);
  useEffect(
    function () {
      if (!userRating) return;
      count.current++;
    },
    [userRating]
  );
  return (
    <div className="details">
      {isLoading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && !isLoading && (
        <>
          <header>
            <button
              onClick={() => dispatch(movieUnselect())}
              className="btn-back"
            >
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
                      onClick={() => dispatch(movieAdded(listItemToBeAdded))}
                      className="btn-add"
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
