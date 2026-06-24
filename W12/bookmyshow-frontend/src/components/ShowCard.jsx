/*
=========================================================
SPRINT 4 – SHOW CARD


TOPICS COVERED


✓ Reusable Components
✓ Props
✓ Event Handling


=========================================================
*/


export default function ShowCard({ show, onBook }) {
  return (
    <article style={styles.card}>
      <p>
        <strong>Date:</strong> {new Date(show.date).toLocaleDateString()}
      </p>


      <p>
        <strong>Time:</strong> {show.time}
      </p>


      <p>
        <strong>Available Seats:</strong> {show.availableSeats}
      </p>


      <button onClick={() => onBook(show)} style={styles.button}>
        Book Tickets
      </button>
    </article>
  );
}


const styles = {
  card: {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
},

  button: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#f84464",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};