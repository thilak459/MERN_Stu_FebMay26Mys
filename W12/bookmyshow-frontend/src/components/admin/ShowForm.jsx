// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\components\admin\ShowForm.jsx
import { useState, useEffect } from "react";


export default function ShowForm({
  movies,
  onSubmit,
  initialData,
  buttonText,
}) {
  const [formData, setFormData] = useState({
    movieId: "",
    date: "",
    time: "",
    totalSeats: 50,
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        movieId: initialData.movieId?._id || initialData.movieId,
        date: initialData.date ? initialData.date.split("T")[0] : "",
        time: initialData.time || "",
        totalSeats: initialData.totalSeats || 50,
      });
    }
  }, [initialData]);


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


  function handleSubmit(event) {
    event.preventDefault();


    onSubmit(formData);
  }


  return (
  <form onSubmit={handleSubmit} style={styles.form}>
    <h2 style={styles.heading}>
      {buttonText}
    </h2>

    <select
      style={styles.input}
      name="movieId"
      value={formData.movieId}
      onChange={handleChange}
      required
    >
      <option value="">Select Movie</option>

      {movies.map((movie) => (
        <option key={movie._id} value={movie._id}>
          {movie.title}
        </option>
      ))}
    </select>

    <input
      style={styles.input}
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      required
    />

    <input
      style={styles.input}
      type="time"
      name="time"
      value={formData.time}
      onChange={handleChange}
      required
    />

    <input
      style={styles.input}
      type="number"
      name="totalSeats"
      placeholder="Total Seats"
      value={formData.totalSeats}
      onChange={handleChange}
    />

    <button
      type="submit"
      style={styles.button}
    >
      {buttonText}
    </button>
  </form>
);
}


const styles = {
  form: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
    maxWidth: "550px",
    margin: "0 auto 25px",
  },

  heading: {
    margin: 0,
    fontSize: "22px",
    color: "#111827",
    textAlign: "center",
    marginBottom: "5px",
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#374151",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    backgroundColor: "#1e40af",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px",
  },
};