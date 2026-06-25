// src/pages/admin/Dashboard.jsx

/*
=========================================================
ADMIN DASHBOARD – LMS

TOPICS COVERED:

✓ API Integration
✓ useEffect / useState
✓ Admin-only protected page

WHY THIS COMPONENT?

Overview for administrators to see
all courses and system stats.

Mirrors admin/Dashboard.jsx from W12/bookmyshow-frontend.

=========================================================
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../api/courseApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  /* Derived stats */
  const totalCourses       = courses.length;
  const webCourses         = courses.filter((c) => c.category === "web").length;
  const programmingCourses = courses.filter((c) => c.category === "programming").length;
  const beginnerCourses    = courses.filter((c) => c.difficulty === "beginner").length;

  return (
    <section className="page-container">
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle">Welcome back, {user?.username} 👋</p>
        </div>
        <button
          id="btn-add-course"
          className="btn btn-primary"
          onClick={() => navigate("/admin/courses")}
          style={styles.addBtn}
        >
          + Manage Courses
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* STATS GRID */}
      <div style={styles.statsGrid}>
        <StatCard icon="📚" label="Total Courses" value={totalCourses} color="#6366f1" />
        <StatCard icon="🌐" label="Web Courses"    value={webCourses}   color="#10b981" />
        <StatCard icon="💻" label="Programming"    value={programmingCourses} color="#f59e0b" />
        <StatCard icon="🟢" label="Beginner"       value={beginnerCourses}    color="#22c55e" />
      </div>

      {/* RECENT COURSES */}
      <section style={styles.recentSection}>
        <h2 style={styles.recentTitle}>All Courses</h2>

        <div style={styles.courseTable}>
          <div style={styles.tableHeader}>
            <span>ID</span>
            <span>Title</span>
            <span>Category</span>
            <span>Difficulty</span>
            <span>Actions</span>
          </div>

          {courses.map((course) => (
            <div key={course.id} style={styles.tableRow}>
              <span style={styles.tableId}>#{course.id}</span>
              <span style={styles.tableTitle}>{course.title}</span>
              <span>
                <span className="badge badge-primary">{course.category}</span>
              </span>
              <span>
                <span className={`badge badge-${course.difficulty}`}>
                  {course.difficulty}
                </span>
              </span>
              <span>
                <button
                  style={styles.viewBtn}
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View
                </button>
              </span>
            </div>
          ))}

          {courses.length === 0 && (
            <p style={styles.noData}>No courses found.</p>
          )}
        </div>
      </section>
    </section>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: `${color}1a`, color }}>
        {icon}
      </div>
      <div>
        <p style={styles.statValue}>{value}</p>
        <p style={styles.statLabel}>{label}</p>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },

  addBtn: {
    padding: "10px 20px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "40px",
  },

  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 22px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    flexShrink: 0,
  },

  statValue: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "var(--text-primary)",
    margin: 0,
    lineHeight: "1",
  },

  statLabel: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    margin: "4px 0 0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },

  recentSection: {
    marginBottom: "24px",
  },

  recentTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "16px",
  },

  courseTable: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 120px 130px 80px",
    gap: "16px",
    padding: "14px 20px",
    background: "rgba(99,102,241,0.08)",
    borderBottom: "1px solid var(--border-card)",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 120px 130px 80px",
    gap: "16px",
    padding: "14px 20px",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    fontSize: "0.875rem",
    transition: "background 150ms ease",
  },

  tableId: {
    color: "var(--text-muted)",
    fontSize: "0.8rem",
  },

  tableTitle: {
    fontWeight: "500",
    color: "var(--text-primary)",
  },

  viewBtn: {
    padding: "4px 12px",
    background: "rgba(99,102,241,0.1)",
    color: "var(--color-primary-light)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: "500",
  },

  noData: {
    padding: "40px",
    textAlign: "center",
    color: "var(--text-muted)",
  },
};
