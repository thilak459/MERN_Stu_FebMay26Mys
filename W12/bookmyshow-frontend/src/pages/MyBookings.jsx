// src/pages/MyBookings.jsx


import { useEffect, useState } from "react";


import BookingCard from "../components/BookingCard";


import { getMyBookings, cancelBooking } from "../api/booking.api";


import LoadingSpinner from "../components/LoadingSpinner";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");


  async function loadBookings() {
    try {
      setLoading(true);


      const response = await getMyBookings();


      setBookings(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadBookings();
  }, []);


  async function handleCancel(bookingId) {
    try {
      await cancelBooking(bookingId);


      await loadBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Cancellation failed");
    }
  }


  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <section style={styles.container}>
      <h1 style={styles.title}>🎟️ My Bookings</h1>


      {error && <p style={styles.error}>{error}</p>}


      {bookings.length === 0 && (
  <p style={styles.empty}>
    No bookings found. Book your first movie! 🎬
  </p>
)}


      <div style={styles.bookingList}>
  {bookings.map((booking) => (
    <BookingCard
      key={booking._id}
      booking={booking}
      onCancel={handleCancel}
    />
  ))}
</div>
    </section>
  );
}


const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },

  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "40px",
    color: "#222",
  },

  error: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: "18px",
    marginBottom: "20px",
  },

  empty: {
    textAlign: "center",
    fontSize: "20px",
    color: "#666",
    marginTop: "80px",
  },
  bookingList: {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  maxWidth: "900px",
  margin: "0 auto",
},
};