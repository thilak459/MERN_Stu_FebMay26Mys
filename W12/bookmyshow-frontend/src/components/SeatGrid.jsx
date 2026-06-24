// src/components/SeatGrid.jsx


import Seat from "./Seat";


export default function SeatGrid({ seats, selectedSeats, setSelectedSeats }) {
  function toggleSeat(seatNumber) {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }


  return (
    <>
      <div style={styles.legend}>
        <span>⬜ Available</span>


        <span>🟩 Selected</span>


        <span>🟥 Booked</span>
      </div>


      <div style={styles.grid}>
        {seats.map((seat) => (
          <Seat
            key={seat.seatNumber}
            seat={seat}
            isSelected={selectedSeats.includes(seat.seatNumber)}
            onSelect={toggleSeat}
          />
        ))}
      </div>
    </>
  );
}


const styles = {
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "30px",
    fontSize: "18px",
    fontWeight: "600",
    flexWrap: "wrap",
  },

  screen: {
    width: "500px",
    maxWidth: "90%",
    margin: "0 auto 40px",
    padding: "12px",
    textAlign: "center",
    background: "#e0e0e0",
    borderRadius: "50px",
    fontWeight: "bold",
    color: "#555",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 55px)",
    gap: "12px",
    justifyContent: "center",
    padding: "20px",
    background: "#fafafa",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    width: "fit-content",
    margin: "0 auto",
  },
};