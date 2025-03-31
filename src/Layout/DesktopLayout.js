import MovieSynopsis from "../pages/MovieSynopsis";
import SearchedMoviesResult from "../pages/SearchedMoviesResult";
import WatchedMoviesList from "../pages/WatchedMoviesList";

function DesktopLayout(selectedMovie) {
  return (
    <>
      <SearchedMoviesResult />
      {selectedMovie.length ? <MovieSynopsis /> : <WatchedMoviesList />}
    </>
  );
}

export default DesktopLayout;
