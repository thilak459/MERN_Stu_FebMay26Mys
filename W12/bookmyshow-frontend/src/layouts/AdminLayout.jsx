// src/layouts/AdminLayout.jsx


/*
=========================================================
SPRINT 1 – ADMIN LAYOUT


TOPICS COVERED:


✓ Nested Routing
✓ Outlet
✓ NavLink
✓ Shared Admin UI


WHY THIS COMPONENT?


Admin pages typically share:


Sidebar
↓
Admin Navigation
↓
Content Area


Examples:


Dashboard
Movie Management
Bookings
Users


Without layouts:


Sidebar gets duplicated
across every admin page.


=========================================================
*/


import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function AdminLayout() {
  const navigate = useNavigate();


  const { logout } = useAuth();


  function handleLogout() {
    logout();


    navigate("/login");
  }
  return (
  <section style={styles.container}>
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>
         Admin Panel
      </h2>

      <nav style={styles.nav}>
        <NavLink
          to="/admin"
          end
          style={getNavStyle}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/movies"
          style={getNavStyle}
        >
          🎬 Movies
        </NavLink>

        <NavLink
          to="/admin/shows"
          style={getNavStyle}
        >
          🎭 Shows
        </NavLink>

        <button
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </nav>
    </aside>

    <main style={styles.content}>
      <Outlet />
    </main>
  </section>
);
}


/*
=========================================================
ACTIVE ADMIN LINKS


Admin users should always know
their current location.


=========================================================
*/


function getNavStyle({ isActive }) {
  return {
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#e2e8f0",
    backgroundColor: isActive
      ? "#1e40af"
      : "transparent",
    padding: "12px 16px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "17px",
    display: "block",
    transition: "all 0.3s ease",
  };
}


const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },

  sidebar: {
    width: "240px",
    backgroundColor: "#0f172a",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    color: "#ffffff",
    margin: 0,
    fontSize: "26px",
    marginBottom: "35px",
    textAlign: "center",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  content: {
    flex: 1,
    padding: "30px",
    overflow: "auto",
  },

  logoutButton: {
    marginTop: "30px",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
};

/*
=========================================================
FLOW


/admin
↓
ProtectedRoute
↓
AdminLayout
↓
Outlet
↓
Dashboard


-----------------------------------------


/admin/movies
↓
ProtectedRoute
↓
AdminLayout
↓
Outlet
↓
Movie Management


=========================================================


KEY TAKEAWAYS


1. Admin UI stays consistent.


2. Outlet powers nested routing.


3. Shared layouts improve maintainability.


4. NavLink improves navigation clarity.


=========================================================


VERIFICATION


✓ Dashboard renders correctly


✓ Movie Management renders correctly


✓ Sidebar remains visible


✓ Active admin links work


✓ Nested routes work


=========================================================
*/