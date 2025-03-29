const MovieRated = function ({ movie, setWatched }) {
  const handleDeleteMovie = function () {
    setWatched((mov) => mov.filter((mov) => mov.imdbID !== movie.imdbID));
  };
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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
          <span>{movie.Runtime} min</span>
        </p>
        <button onClick={handleDeleteMovie} className="btn-delete">
          ⛔
        </button>
      </div>
    </li>
  );
};
export default MovieRated;
