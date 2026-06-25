// src/components/Navbar.jsx

/*
=========================================================
AUTH-AWARE NAVBAR

TOPICS COVERED:

✓ Conditional Rendering
✓ useAuth
✓ useNavigate
✓ Logout
✓ Role-based navigation

Logged Out: Home | Courses | Login
Student:    Home | Courses | My Enrollments | Logout
Admin:      Home | Courses | My Enrollments | Admin | Logout

=========================================================
*/

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { isAuthenticated, logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <div style={styles.logoArea}>
        <div style={styles.logoIcon}>🎓</div>
        <h2 style={styles.logo}>LMS Portal</h2>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        <NavLink to="/" end style={getNavStyle}>
          Home
        </NavLink>

        <NavLink to="/courses" style={getNavStyle}>
          Courses
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/my-enrollments" style={getNavStyle}>
            My Enrollments
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin/dashboard" style={getNavStyle}>
            Admin
          </NavLink>
        )}

        {!isAuthenticated ? (
          <NavLink to="/login" style={getNavStyle}>
            Login
          </NavLink>
        ) : (
          <div style={styles.userArea}>
            <span style={styles.userBadge}>
              👤 {user?.username}
            </span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function getNavStyle({ isActive }) {
  return {
    textDecoration: "none",
    color: isActive ? "var(--color-primary-light)" : "var(--text-secondary)",
    fontWeight: isActive ? "600" : "400",
    fontSize: "0.875rem",
    paddingBottom: "2px",
    borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
    transition: "all 150ms ease",
  };
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 32px",
    height: "64px",
    background: "var(--bg-nav)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border-card)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoIcon: {
    fontSize: "1.5rem",
  },

  logo: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  links: {
    display: "flex",
    gap: "28px",
    alignItems: "center",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  userBadge: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    background: "rgba(99, 102, 241, 0.1)",
    padding: "4px 12px",
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--border-color)",
  },

  logoutButton: {
    padding: "6px 16px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "var(--radius-full)",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 150ms ease",
  },
};
