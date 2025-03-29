import { useState, useRef } from "react";
import { useGetMovies } from "./useGetMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKeyDown } from "./useKeyDown";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import MovieList from "./pages/MovieList";
import Movies from "./components/Movies";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import MovieSummary from "./components/MovieSummary";
import MovieRated from "./components/MovieRated";

// const key = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const inputEl = useRef(null);
  // funcitons
  const handleSelectedMovie = function (id) {
    setSelectedMovieId((currId) => (currId === id ? "" : id));
  };
  const handleCloseMovie = function () {
    setSelectedMovieId("");
  };
  //custom hooks
  const { isLoading, err, movies } = useGetMovies(query);
  const [watched, setWatched] = useLocalStorage("watched");

  useKeyDown("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <>
      <Nav
        handleCloseMovie={handleCloseMovie}
        movies={movies}
        query={query}
        setQuery={setQuery}
        ref={inputEl}
      />
      <Main>
        {!isLoading && !err && (
          <MovieList>
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movies
                  handleSelectedMovie={handleSelectedMovie}
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </ul>
          </MovieList>
        )}
        {isLoading && <Loading />}

        {err && <ErrorMessage>{err}</ErrorMessage>}
        {/* RIGHT SIDE START HERE NOTE: */}
        <MovieList>
          {selectedMovieId ? (
            <MovieDetails
              watched={watched}
              setWatched={setWatched}
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <ul className="list">
                {watched?.map((movie) => (
                  <MovieRated
                    setWatched={setWatched}
                    movie={movie}
                    key={movie.imdbID}
                  />
                ))}
              </ul>
            </>
          )}
        </MovieList>
      </Main>
    </>
  );
}
