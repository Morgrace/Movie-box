import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import Movies from "../components/Movies";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
function SearchedMoviesResult() {
  const { isLoading, error } = useSelector((store) => store.movies);
  return (
    <MovieList>
      {isLoading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!isLoading && !error && (
        <ul className="list list-movies">
          <Movies />
        </ul>
      )}
    </MovieList>
  );
}

export default SearchedMoviesResult;
