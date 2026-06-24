// src/pages/Home.jsx


/*
=========================================================
SPRINT 1 – HOME PAGE


TOPICS COVERED:


✓ Functional Components
✓ JSX
✓ useNavigate
✓ Event Handling


WHY THIS COMPONENT?


This is the landing page of our
BookMyShow application.


Responsibilities:


✓ Introduce the application
✓ Guide users to major sections
✓ Act as the entry point


Future Evolution:


Sprint 3:
↓
Featured Movies API


Sprint 5:
↓
Personalized Recommendations


=========================================================
*/


import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();


  return (
    <section>
      {/* Hero Section */}


      <section style={styles.hero}>
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
           Welcome to BookMyShow
        </h1>


        <p>Discover movies, explore shows, and book tickets effortlessly.</p>


        <div style={styles.actions}>
          <button
            style={styles.primaryButton}
            onClick={() => navigate("/movies")}
          >
            Explore Movies
          </button>


          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </section>


      {/* Features */}


      <section>
        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
            fontSize: "40px",
          }}
        >
          What You Can Do
        </h2>


        <div style={styles.featureGrid}>
          <FeatureCard
            title="Browse Movies"
            description="Explore currently available movies."
          />


          <FeatureCard
            title="Book Tickets"
            description="Reserve seats with ease."
          />


          <FeatureCard
            title="Track Bookings"
            description="View your booking history."
          />
        </div>
      </section>
    </section>
  );
}


function FeatureCard({
  title,


  description,
}) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>


      <p>{description}</p>
    </div>
  );
}


const styles = {
  hero: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    textAlign: "center",
    padding: "100px 20px",
    borderRadius: "20px",
    margin: "30px",
  },


  actions: {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
},


  primaryButton: {
    backgroundColor: "#f84464",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },


  secondaryButton: {
    backgroundColor: "#fff",
    color: "#f84464",
    border: "none",
    borderRadius: "10px",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },


  featureGrid: {
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    padding: "0 40px",
  },


  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};


/*
=========================================================
KEY TAKEAWAYS


1. Home pages guide users.


2. Navigation should be intuitive.


3. Future API enhancements should
   extend existing components.


=========================================================
*/
