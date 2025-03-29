const Nav = function ({ movies, query, setQuery, handleCloseMovie, ref }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        ref={ref}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleCloseMovie();
        }}
      />

      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
