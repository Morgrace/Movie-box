import { useState, useRef, useEffect } from "react";
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

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function App() {
  const width = useWindowWidth();
  const isMobile = width < 829;

  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const inputEl = useRef(null);

  // Functions
  const handleSelectedMovie = function (id) {
    setSelectedMovieId((currId) => (currId === id ? "" : id));
  };

  const handleCloseMovie = function () {
    setSelectedMovieId("");
  };

  // Custom hooks
  const { isLoading, err, movies } = useGetMovies(query);
  const [watched, setWatched] = useLocalStorage("watched");

  // Determine if the search bar is active
  const searchBarActive = document.activeElement === inputEl.current;
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
        {isMobile ? (
          // Mobile Layout
          searchBarActive && query ? (
            <>
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
            </>
          ) : (
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
          )
        ) : (
          // Desktop Layout: Render two MovieList boxes side by side.
          <>
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
          </>
        )}
      </Main>
    </>
  );
}
