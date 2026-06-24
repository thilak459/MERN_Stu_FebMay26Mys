// src/components/Navbar.jsx


/*
=========================================================
SPRINT 2 – AUTH-AWARE NAVBAR


TOPICS COVERED:


✓ Conditional Rendering
✓ useAuth
✓ useNavigate
✓ Logout


WHY THIS COMPONENT?


Real applications adapt their UI
based on authentication state.


Logged Out
↓
Login
Signup


Logged In
↓
Bookings
Logout


Admin
↓
Admin Dashboard


=========================================================
*/


import { NavLink, useNavigate } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";


export default function Navbar() {
  const navigate = useNavigate();


  const {
    isAuthenticated,


    logout,


    user,
  } = useAuth();


  function handleLogout() {
    logout();


    navigate("/login");
  }


  return (
    <nav style={styles.nav}>
      <h2
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        🎬 BookMyShow
      </h2>


      <div style={styles.links}>
        <NavLink to="/" end style={getNavStyle}>
          Home
        </NavLink>


        <NavLink to="/movies" style={getNavStyle}>
          Movies
        </NavLink>


        {isAuthenticated && (
          <>
      
            <NavLink
              to="/my-bookings"
              style={getNavStyle}
            >
              My Bookings
            </NavLink>
          </>
        )}



        {user?.role === "admin" && (
          <NavLink to="/admin/dashboard" style={getNavStyle}>
            Admin
          </NavLink>
        )}


        {!isAuthenticated ? (
          <>
            <NavLink to="/login" style={getNavStyle}>
              Login
            </NavLink>


            <NavLink to="/signup" style={getNavStyle}>
              Signup
            </NavLink>
          </>
        ) : (
          <>
            <span style={styles.userName}>Hi, {user?.name}</span>


            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


function getNavStyle({ isActive }) {
  return {
    textDecoration: "none",


    color: isActive ? "#d32f2f" : "#333",


    fontWeight: isActive ? "bold" : "normal",


    borderBottom: isActive ? "2px solid #d32f2f" : "none",


    padding: "8px 0",
    fontSize: "17px",
    transition: "0.3s",
  };
}


const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  },


  logo: {
    margin: 0,
    color: "#f84464",
    fontSize: "35px",
    fontWeight: "700",
    cursor: "pointer",
  },


  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },


  userName: {
    fontWeight: "600",
    fontSize: "18px",
  },


  logoutButton: {
    backgroundColor: "#f84464",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
};


/*
=========================================================
NAVBAR STATES


Logged Out


Home
Movies
Login
Signup




Customer


Home
Movies
Bookings
Logout




Admin


Home
Movies
Bookings
Admin
Logout


=========================================================


KEY TAKEAWAYS


1. UI should reflect authentication state.


2. Logout affects the entire app instantly.


3. Role-based navigation improves UX.


=========================================================
*/