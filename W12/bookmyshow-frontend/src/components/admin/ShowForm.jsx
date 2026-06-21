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
      <select
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
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />


      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />


      <input
        type="number"
        name="totalSeats"
        value={formData.totalSeats}
        onChange={handleChange}
      />


      <button type="submit">{buttonText}</button>
    </form>
  );
}


const styles = {
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "30px",
  },
};