// src/components/EnrollmentCard.jsx

/*
=========================================================
ENROLLMENT CARD

Displays an enrolled course with:
- Course ID
- Enrollment date
- Link to view progress

Mirrors BookingCard from W12/bookmyshow-frontend.

=========================================================
*/

import { useNavigate } from "react-router-dom";

export default function EnrollmentCard({ enrollment }) {
  const navigate = useNavigate();

  const enrolledDate = new Date(enrollment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconWrap}>📚</div>
        <div>
          <h3 style={styles.title}>Course #{enrollment.courseId}</h3>
          <p style={styles.date}>Enrolled on {enrolledDate}</p>
        </div>
      </div>

      <div style={styles.actions}>
        <button
          style={styles.progressBtn}
          onClick={() => navigate(`/courses/${enrollment.courseId}`)}
        >
          View Course →
        </button>
        <button
          style={styles.trackBtn}
          onClick={() => navigate(`/progress/${enrollment.courseId}`)}
        >
          Track Progress
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "all 250ms ease",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },

  iconWrap: {
    fontSize: "1.75rem",
    flexShrink: 0,
  },

  title: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },

  date: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    marginTop: "4px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  progressBtn: {
    padding: "7px 16px",
    background: "rgba(99, 102, 241, 0.15)",
    color: "var(--color-primary-light)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 150ms ease",
  },

  trackBtn: {
    padding: "7px 16px",
    background: "rgba(16, 185, 129, 0.1)",
    color: "var(--color-accent)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 150ms ease",
  },
};
