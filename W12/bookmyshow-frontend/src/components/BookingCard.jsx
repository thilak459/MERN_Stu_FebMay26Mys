// src/components/BookingCard.jsx


export default function BookingCard({ booking, onCancel }) {
  const movie = booking.showId?.movieId;


  return (
  <div style={styles.card}>
    <div style={styles.header}>
      <h2 style={styles.movieTitle}>🎬 {movie?.title}</h2>

      <span
        style={{
          ...styles.status,
          backgroundColor:
            booking.status === "booked" ? "#43a047" : "#d32f2f",
        }}
      >
        {booking.status}
      </span>
    </div>

    <p style={styles.text}>
      🎟️ <strong>Seats:</strong> {booking.seats.join(", ")}
    </p>

    <p style={styles.text}>
      📅 <strong>Show Date:</strong>{" "}
      {new Date(booking.showId?.date).toLocaleDateString()}
    </p>

    <p style={styles.text}>
      🕒 <strong>Time:</strong> {booking.showId?.time}
    </p>

    {booking.status === "booked" && (
      <button
        style={styles.cancelButton}
        onClick={() => onCancel(booking._id)}
      >
        Cancel Booking
      </button>
    )}
  </div>
);
}


const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    marginBottom: "25px",
    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
    borderLeft: "6px solid #1e40af",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },

  movieTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  text: {
    fontSize: "17px",
    marginBottom: "14px",
    color: "#4b5563",
    lineHeight: "1.6",
  },

  status: {
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "capitalize",
    letterSpacing: "0.5px",
  },

  cancelButton: {
    marginTop: "22px",
    backgroundColor: "#1e40af",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(30,64,175,0.2)",
    transition: "0.3s ease",
  },
};