// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\pages\admin\ShowManagement.jsx
import { useEffect, useState } from "react";


import { getMovies } from "../../api/movie.api";


import {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../../api/show.api";


import ShowForm from "../../components/admin/ShowForm";


export default function ShowManagement() {
  const [movies, setMovies] = useState([]);


  const [shows, setShows] = useState([]);


  const [editingShow, setEditingShow] = useState(null);


  async function loadData() {
    const movieResponse = await getMovies();


    const showResponse = await getShows();


    setMovies(movieResponse.data.movies);


    setShows(showResponse.data);
  }


  useEffect(() => {
    loadData();
  }, []);


  async function handleSubmit(showData) {
    if (editingShow) {
      await updateShow(editingShow._id, showData);


      setEditingShow(null);
    } else {
      await createShow(showData);
    }


    loadData();
  }


  async function handleDelete(id) {
    const confirmed = window.confirm("Delete show?");


    if (!confirmed) return;


    await deleteShow(id);


    loadData();
  }


  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎭 Show Management</h1>

        <p style={styles.subtitle}>
          Create, update and manage movie shows.
        </p>
      </div>

      <ShowForm
        movies={movies}
        onSubmit={handleSubmit}
        initialData={editingShow}
        buttonText={editingShow ? "Update Show" : "Create Show"}
      />

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Movie</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Total Seats</th>
              <th style={styles.th}>Available Seats</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shows.map((show) => (
              <tr key={show._id}>
                <td style={styles.td}>
                  {show.movieId?.title}
                </td>

                <td style={styles.td}>
                  {new Date(show.date).toLocaleDateString()}
                </td>

                <td style={styles.td}>
                  {show.time}
                </td>

                <td style={styles.td}>
                  {show.totalSeats}
                </td>

                <td style={styles.td}>
                  {show.availableSeats}
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.editButton}
                    onClick={() =>
                      setEditingShow(show)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      handleDelete(show._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "25px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    fontSize: "32px",
    color: "#111827",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "15px",
  },

  tableContainer: {
    marginTop: "25px",
    background: "#ffffff",
    borderRadius: "12px",
    overflowX: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
  },

  th: {
    backgroundColor: "#1e40af",
    color: "#ffffff",
    padding: "14px",
    textAlign: "left",
    fontSize: "14px",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "14px",
  },

  editButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    marginRight: "10px",
    fontSize: "13px",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "13px",
  },
};