// src/pages/admin/MovieManagement.jsx


import { useEffect, useState } from "react";


import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../api/movie.api";


import MovieForm from "../../components/admin/MovieForm";


export default function MovieManagement() {
  const [movies, setMovies] = useState([]);


  const [editingMovie, setEditingMovie] = useState(null);


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  async function loadMovies() {
    try {
      setLoading(true);


      const response = await getMovies();


      setMovies(response.data.movies);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadMovies();
  }, []);


  async function handleSubmit(movieData) {
    try {
      setError("");


      if (editingMovie) {
        await updateMovie(editingMovie._id, movieData);


        setEditingMovie(null);
      } else {
        await createMovie(movieData);
      }


      await loadMovies();
    } catch (error) {
      setError(error.response?.data?.message || "Movie operation failed");
    }
  }


  async function handleDelete(movieId) {
    const confirmed = window.confirm("Delete movie?");


    if (!confirmed) {
      return;
    }


    try {
      await deleteMovie(movieId);


      await loadMovies();
    } catch (error) {
      setError(error.response?.data?.message || "Delete failed");
    }
  }


  return (
    <section style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>🎬 Movie Management</h1>
          <p style={styles.subtitle}>
            Create, update and delete movies.
          </p>
        </div>
      </header>


      {error && <p style={styles.error}>{error}</p>}


      <MovieForm
        initialData={editingMovie}
        onSubmit={handleSubmit}
        buttonText={editingMovie ? "Update Movie" : "Create Movie"}
      />


      {loading ? (
        <p style={styles.loading}>Loading movies...</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Genre</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Duration</th>
                <th style={styles.th}>Release Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>


            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td style={styles.td}>{movie.title}</td>


                  <td style={styles.td}>{movie.genre}</td>


                  <td style={styles.td}>{movie.rating}</td>


                  <td style={styles.td}>{movie.duration} mins</td>


                  <td style={styles.td}>{new Date(movie.releaseDate).toLocaleDateString()}</td>


                  <td>
                    <button
                      style={styles.editButton}
                      onClick={() => setEditingMovie(movie)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}


const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
    color: "#111827",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "16px",
  },

  tableContainer: {
    overflowX: "auto",
    marginTop: "30px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },

  th: {
    backgroundColor: "#1e40af",
    color: "#fff",
    padding: "16px",
    textAlign: "left",
    fontSize: "15px",
  },

  td: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
  },

  editButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  loading: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: "20px",
  },

  error: {
    color: "#dc2626",
    marginBottom: "20px",
  },
};