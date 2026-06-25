// src/pages/admin/Dashboard.jsx


/*
=========================================================
SPRINT 1 – ADMIN DASHBOARD


TOPICS COVERED:


✓ Functional Components
✓ Rendering Lists
✓ map()
✓ Dashboard Layout
✓ Reusable UI Patterns


WHY THIS COMPONENT?


Administrators need a quick overview
of the system.


Examples:


Total Movies
Total Shows
Total Bookings


Sprint 1:


Static Dashboard Shell


Sprint 7:


Analytics APIs
↓
Real-Time Statistics
↓
Charts & Insights


=========================================================
*/


import { useEffect, useState } from "react";


import { getDashboardStats } from "../../api/admin.api";


export default function Dashboard() {
  const [stats, setStats] = useState(null);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");


  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboardStats();


        setStats(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }


    loadDashboard();
  }, []);


  if (loading) {
    return <p>Loading dashboard...</p>;
  }


  if (error) {
    return <p style={styles.error}>{error}</p>;
  }


  const dashboardStats = [
  {
    title: "Movies",
    value: stats.totalMovies,
    description: "Movies currently available",
    icon: "🎬",
  },
  {
    title: "Shows",
    value: stats.totalShows,
    description: "Active show schedules",
    icon: "🎭",
  },
  {
    title: "Bookings",
    value: stats.totalBookings,
    description: "Total bookings made",
    icon: "🎟️",
  },
  {
    title: "Users",
    value: stats.totalUsers,
    description: "Registered users",
    icon: "👤",
  },
];


  return (
    <section style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📊 Admin Dashboard</h1>

        <p style={styles.subtitle}>
          Welcome back. Here's a quick overview of the platform.
        </p>
      </header>


      <section style={styles.grid}>
        {dashboardStats.map((stat) => (
          <article key={stat.title} style={styles.card}>
  <div style={styles.icon}>{stat.icon}</div>

  <h3 style={styles.cardTitle}>{stat.title}</h3>

  <h2 style={styles.cardValue}>{stat.value}</h2>

  <p style={styles.cardDescription}>
    {stat.description}
  </p>
</article>
        ))}
      </section>
    </section>
  );
}


const styles = {
  container: {
    padding: "25px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
    color: "#111827",
    marginBottom: "8px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
  },

  icon: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  cardTitle: {
    color: "#6b7280",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "5px",
  },

  cardValue: {
    fontSize: "30px",
    color: "#1e40af",
    fontWeight: "700",
    marginBottom: "5px",
  },

  cardDescription: {
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  error: {
    color: "#dc2626",
    textAlign: "center",
    fontSize: "16px",
    marginTop: "20px",
  },
};