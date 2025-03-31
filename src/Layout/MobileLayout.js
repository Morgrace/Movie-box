import { useSelector } from "react-redux";
import SearchedMoviesResult from "../pages/SearchedMoviesResult";
import MovieSynopsis from "../pages/MovieSynopsis";
import WatchedMoviesList from "../pages/WatchedMoviesList";

function MobileLayout({ selected }) {
  const searchBarActive = useSelector((store) => store.mobile.searchBarActive);

  return (
    <>
      {searchBarActive && <SearchedMoviesResult />}
      {selected && <MovieSynopsis />}
      {!searchBarActive && !selected && <WatchedMoviesList />}
    </>
  );
}

export default MobileLayout;
