import { useDispatch, useSelector } from "react-redux";
import { movieDeleted } from "../reducers/watchedMoviesSlice";

const MovieRated = function () {
  const dispatch = useDispatch();
  const watchedMovies = useSelector((store) => store.watched.watchedMovies);

  return watchedMovies.map((movie, i) => (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={(e) => handleDeleteMovie(movie.imdbID)}
          className="btn-delete"
        >
          ⛔
        </button>
      </div>
    </li>
  ));
  function handleDeleteMovie(id) {
    dispatch(movieDeleted(id));
  }
};
export default MovieRated;
