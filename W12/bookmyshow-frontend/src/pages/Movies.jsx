// src/pages/Movies.jsx


import { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";


import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";


import { fetchMovies } from "../redux/movies/moviesSlice";


export default function Movies() {
  const dispatch = useDispatch();


  const { movies, loading, error, pagination } = useSelector(
    (state) => state.movies,
  );


  const [search, setSearch] = useState("");


  const [genre, setGenre] = useState("");


  const [rating, setRating] = useState("");


  useEffect(() => {
    dispatch(
      fetchMovies({
        page: pagination.page,
        search,
        genre,
        rating,
      }),
    );
  }, [dispatch, pagination.page, search, genre, rating]);


  function handlePageChange(page) {
    dispatch(
      fetchMovies({
        page,
        search,
        genre,
        rating,
      }),
    );
  }


  return (
    <section style={{ padding: "30px" }}>
      <h1 style={styles.title}>Movies</h1>

      <p style={styles.subtitle}>
        Discover and explore your favourite movies.
      </p>


      <div style={styles.filters}>
        <input
          style={styles.input}
          type="text"
          placeholder="🔍 Search title"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />


        <select
          style={styles.select}
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value="">All Genres</option>


          <option value="Action">Action</option>


          <option value="Comedy">Comedy</option>


          <option value="Sci-Fi">Sci-Fi</option>


          <option value="Romance">Romance</option>


          <option value="Drama">Drama</option>
        </select>


        <select
          style={styles.select}
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="">All Ratings</option>


          <option value="4">4+</option>


          <option value="4.5">4.5+</option>


          <option value="4.8">4.8+</option>
        </select>
      </div>


      {loading && <LoadingSpinner />}


      {error && <p style={styles.error}>{error}</p>}


      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}


      {!loading && !error && movies.length > 0 && (
        <>
          <div style={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>


          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}


const styles = {
  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "10px",
    color: "#222",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    marginBottom: "30px",
  },

  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    margin: "35px 0",
  },

  input: {
    padding: "12px 18px",
    width: "260px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  select: {
    padding: "12px 18px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "15px",
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    padding: "20px",
  },

  error: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: "18px",
  },
};