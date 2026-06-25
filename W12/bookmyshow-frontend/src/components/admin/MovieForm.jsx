// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\components\admin\MovieForm.jsx
import { useState, useEffect } from "react";


export default function MovieForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    rating: "",
    duration: "",
    releaseDate: "",
    poster: "",
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        releaseDate: initialData.releaseDate
          ? initialData.releaseDate.split("T")[0]
          : "",
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


    setFormData({
      title: "",
      genre: "",
      rating: "",
      duration: "",
      releaseDate: "",
      poster: "",
    });
  }


  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>
        {buttonText}
      </h2>

      <input
        style={styles.input}
        name="title"
        placeholder="Movie Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <select
        style={styles.input}
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      >
        <option value="">Select Genre</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
      </select>

      <input
        style={styles.input}
        type="number"
        step="0.1"
        min="1"
        max="5"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <input
        style={styles.input}
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        required
      />

      <input
        style={styles.input}
        type="date"
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleChange}
        required
      />

      <input
        style={styles.input}
        name="poster"
        placeholder="Poster URL"
        value={formData.poster}
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
    maxWidth: "700px",
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
