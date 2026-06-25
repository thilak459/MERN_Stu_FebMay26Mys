// src/pages/MyEnrollments.jsx

/*
=========================================================
MY ENROLLMENTS PAGE – LMS

TOPICS COVERED:

✓ useEffect
✓ useState
✓ API Integration
✓ Authentication Gate
✓ Loading State

WHY THIS COMPONENT?

Shows the currently logged-in student's
enrolled courses.

Mirrors MyBookings.jsx from W12/bookmyshow-frontend.

Backend Endpoint:
GET /users/enrollments

=========================================================
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEnrollments } from "../api/enrollApi";
import EnrollmentCard from "../components/EnrollmentCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyEnrollments() {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        setLoading(true);
        const data = await getMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError(err.message || "Failed to load enrollments.");
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, []);

  return (
    <section className="page-container">
      <h1 className="section-title">My Enrollments</h1>
      <p className="section-subtitle">
        Courses you are currently enrolled in
      </p>

      {loading && <LoadingSpinner message="Loading your enrollments..." />}

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {!loading && !error && enrollments.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>📭</p>
          <h3 style={styles.emptyTitle}>No enrollments yet</h3>
          <p style={styles.emptyText}>
            Browse our course catalog and enroll in a course to get started.
          </p>
          <button
            id="btn-browse-courses"
            className="btn btn-primary"
            onClick={() => navigate("/courses")}
            style={{ marginTop: "8px" }}
          >
            🚀 Browse Courses
          </button>
        </div>
      )}

      {!loading && !error && enrollments.length > 0 && (
        <>
          <p style={styles.count}>
            You are enrolled in <strong>{enrollments.length}</strong> course{enrollments.length !== 1 ? "s" : ""}
          </p>
          <div style={styles.grid}>
            {enrollments.map((enrollment, idx) => (
              <EnrollmentCard key={idx} enrollment={enrollment} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  emptyIcon: {
    fontSize: "3.5rem",
  },

  emptyTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },

  emptyText: {
    color: "var(--text-secondary)",
    fontSize: "0.95rem",
    maxWidth: "360px",
    lineHeight: "1.6",
  },

  count: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
};
