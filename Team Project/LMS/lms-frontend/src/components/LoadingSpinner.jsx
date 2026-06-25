// src/components/LoadingSpinner.jsx

/*
=========================================================
LOADING SPINNER

Reusable spinner component for
async operations.

=========================================================
*/

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    gap: "16px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(99, 102, 241, 0.15)",
    borderTop: "3px solid var(--color-primary)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  text: {
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
    letterSpacing: "0.05em",
  },
};
