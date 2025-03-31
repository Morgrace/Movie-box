import { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMovies } from "../hooks/useGetMovies";
import { useKeyDown } from "../hooks/useKeyDown";
import {
  searchBarActive,
  searchBarInactive,
} from "../reducers/mobileResponseSlice";

const Nav = function () {
  const [query, setQuery] = useState("");
  const movies = useSelector((store) => store.movies.movies);
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  useKeyDown("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });
  const active = document.activeElement === inputEl.current && query.length > 2;
  const isActive = useMemo(() => active, [active]);
  useGetMovies(query);

  useEffect(
    function () {
      if (isActive) dispatch(searchBarActive());
      else dispatch(searchBarInactive());
    },
    [dispatch, isActive]
  );
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        ref={inputEl}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
