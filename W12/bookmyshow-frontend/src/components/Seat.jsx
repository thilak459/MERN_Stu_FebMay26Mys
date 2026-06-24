// src/components/Seat.jsx


export default function Seat({ seat, isSelected, onSelect }) {
  const isBooked = seat.isBooked;


  function handleClick() {
    if (isBooked) return;


    onSelect(seat.seatNumber);
  }


  return (
    <button
      onClick={handleClick}
      disabled={isBooked}
      style={{
        ...styles.seat,


        ...(isBooked && styles.booked),


        ...(isSelected && styles.selected),
      }}
    >
      {seat.seatNumber}
    </button>
  );
}


const styles = {
  seat: {
    width: "55px",
    height: "55px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontWeight: "bold",
    fontSize: "15px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },

  booked: {
    backgroundColor: "#e53935",
    color: "#fff",
    cursor: "not-allowed",
    boxShadow: "0 3px 8px rgba(229,57,53,0.4)",
  },

  selected: {
    backgroundColor: "#43a047",
    color: "#fff",
    boxShadow: "0 3px 8px rgba(67,160,71,0.4)",
  },
  
};