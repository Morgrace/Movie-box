import { useDispatch, useSelector } from "react-redux";
import { movieSelected } from "../reducers/watchedMoviesSlice";
import useGetMovieSynopsis from "../hooks/useGetMovieSynopsis";

const Movies = function () {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.movies);
  const getSynopsis = useGetMovieSynopsis();
  return movies.map((movie) => (
    <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  ));
  function handleSelectedMovie(movieID) {
    dispatch(movieSelected(movieID));
    getSynopsis(movieID);
  }
};
export default Movies;
