// src/pages/NotFound.jsx

/*
=========================================================
404 NOT FOUND PAGE – LMS

=========================================================
*/

import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <span style={styles.code}>404</span>
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={styles.actions}>
          <button
            id="btn-go-home"
            className="btn btn-primary"
            onClick={() => navigate("/")}
            style={styles.btn}
          >
            🏠 Go Home
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/courses")}
            style={styles.btn}
          >
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },

  content: {
    textAlign: "center",
    maxWidth: "480px",
  },

  code: {
    display: "block",
    fontSize: "6rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: "1",
    marginBottom: "16px",
  },

  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "12px",
  },

  text: {
    color: "var(--text-secondary)",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "32px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },

  btn: {
    padding: "12px 24px",
  },
};
