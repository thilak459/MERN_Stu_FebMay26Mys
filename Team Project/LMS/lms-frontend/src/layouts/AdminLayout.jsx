// src/layouts/AdminLayout.jsx

/*
=========================================================
ADMIN LAYOUT

TOPICS COVERED:

✓ Nested Routing
✓ Outlet
✓ NavLink
✓ Shared Admin UI

WHY THIS COMPONENT?

Admin pages share a sidebar:

Sidebar
↓
Admin Navigation (Dashboard, Courses)
↓
Content Area (Outlet)

Mirrors AdminLayout from W12/bookmyshow-frontend.

=========================================================
*/

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <section style={styles.container}>
      {/* ADMIN SIDEBAR */}
      <aside style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.sidebarLogo}>
          <span style={styles.sidebarIcon}>🎓</span>
          <h2 style={styles.sidebarTitle}>Admin</h2>
        </div>

        {/* User info */}
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            {user?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p style={styles.userName}>{user?.username}</p>
            <p style={styles.userRole}>Administrator</p>
          </div>
        </div>

        <div style={styles.divider}></div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <NavLink to="/admin" end style={getSidebarNavStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/courses" style={getSidebarNavStyle}>
            📚 Courses
          </NavLink>

          <NavLink to="/admin/enrollments" style={getSidebarNavStyle}>
            📋 Enrollments
          </NavLink>
        </nav>

        <div style={styles.divider}></div>

        {/* Logout */}
        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* ADMIN CONTENT */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </section>
  );
}

function getSidebarNavStyle({ isActive }) {
  return {
    textDecoration: "none",
    color: isActive ? "var(--color-primary-light)" : "var(--text-secondary)",
    fontWeight: isActive ? "600" : "400",
    fontSize: "0.875rem",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
    border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
    transition: "all 150ms ease",
    display: "block",
  };
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },

  sidebar: {
    width: "260px",
    background: "var(--bg-sidebar)",
    borderRight: "1px solid var(--border-card)",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flexShrink: 0,
  },

  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 14px",
  },

  sidebarIcon: {
    fontSize: "1.5rem",
  },

  sidebarTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    background: "rgba(99, 102, 241, 0.08)",
    borderRadius: "var(--radius-md)",
  },

  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#fff",
    flexShrink: 0,
  },

  userName: {
    margin: 0,
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--text-primary)",
  },

  userRole: {
    margin: 0,
    fontSize: "0.75rem",
    color: "var(--text-muted)",
  },

  divider: {
    height: "1px",
    background: "var(--border-card)",
    margin: "4px 0",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  content: {
    flex: 1,
    padding: "32px",
    background: "var(--bg-base)",
    overflowY: "auto",
  },

  logoutButton: {
    padding: "10px 14px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 150ms ease",
    textAlign: "left",
    marginTop: "auto",
  },
};
