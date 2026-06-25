// src/pages/admin/EnrollmentsAdmin.jsx

/*
=========================================================
ADMIN ENROLLMENTS PAGE – LMS

Allows admin to view any user's enrollments.

Backend Endpoint:
GET /users/:userId/enrollments

=========================================================
*/

import { useState } from "react";
import { getUserEnrollments } from "../../api/enrollApi";

export default function EnrollmentsAdmin() {
  const [userId,      setUserId]      = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [searched,    setSearched]    = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    if (!userId.trim()) {
      setError("Please enter a user ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await getUserEnrollments(userId);
      setEnrollments(data);
    } catch (err) {
      setError(err.message);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-container">
      <h1 className="section-title">Enrollments</h1>
      <p className="section-subtitle">View enrollments for any user</p>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} style={styles.searchForm} id="enrollment-search-form">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="userId">User ID</label>
          <input
            id="userId"
            className="form-input"
            type="number"
            placeholder="Enter user ID (e.g. 1)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            min={1}
            style={{ width: "100%" }}
          />
        </div>
        <button
          id="btn-search-user"
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={styles.searchBtn}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {/* RESULTS */}
      {searched && !loading && !error && (
        <div style={styles.results}>
          <h3 style={styles.resultsTitle}>
            Enrollments for User #{userId}
            <span style={styles.count}>{enrollments.length} found</span>
          </h3>

          {enrollments.length === 0 ? (
            <p style={styles.noData}>This user has no enrollments.</p>
          ) : (
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span>User ID</span>
                <span>Course ID</span>
                <span>Enrolled Date</span>
              </div>

              {enrollments.map((e, idx) => (
                <div key={idx} style={styles.tableRow}>
                  <span>#{e.userId}</span>
                  <span>Course #{e.courseId}</span>
                  <span style={styles.dateText}>
                    {new Date(e.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const styles = {
  searchForm: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
    padding: "24px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  searchBtn: {
    padding: "11px 24px",
    flexShrink: 0,
  },

  results: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },

  resultsTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid var(--border-card)",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },

  count: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    background: "rgba(255,255,255,0.05)",
    padding: "2px 10px",
    borderRadius: "var(--radius-full)",
    fontWeight: "400",
  },

  table: {
    display: "flex",
    flexDirection: "column",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "12px 20px",
    background: "rgba(99,102,241,0.06)",
    fontSize: "0.7rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid var(--border-card)",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "12px 20px",
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
  },

  dateText: {
    color: "var(--text-muted)",
    fontSize: "0.8rem",
  },

  noData: {
    padding: "40px",
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "0.9rem",
  },
};
