import MovieList from "../components/MovieList";
import MovieRated from "../components/MovieRated";
import MovieSummary from "../components/MovieSummary";

function WatchedMoviesList() {
  return (
    <MovieList>
      <MovieSummary />
      <ul className="list">
        <MovieRated />
      </ul>
    </MovieList>
  );
}

export default WatchedMoviesList;
