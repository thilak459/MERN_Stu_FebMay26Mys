// src/pages/Login.jsx

/*
=========================================================
LOGIN PAGE – LMS

TOPICS COVERED:

✓ Controlled Components
✓ useState
✓ API Integration
✓ Context API
✓ JWT Authentication
✓ Loading State
✓ Error Handling
✓ useNavigate

WHY THIS COMPONENT?

Login is the gateway into the
authenticated LMS experience.

Backend contract:
POST /auth/login
Body: { username, password }
Response: { message, token, user: { id, username, role } }

Mirrors Login.jsx from W12/bookmyshow-frontend.

=========================================================
*/

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    /* Client Validation */
    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const response = await loginUser(form);

      /*
      Backend Response:
      {
        message: "Login successful",
        token: "...",
        user: { id, username, role }
      }
      */

      const token = response.token;
      const user  = response.user;

      if (!token || !user) {
        throw new Error("Invalid login response received.");
      }

      /* Update Auth Context */
      login(token, user);

      /* Role-based Redirection */
      const from = location.state?.from?.pathname;

      if (user.role === "admin") {
        navigate(from || "/admin/dashboard", { replace: true });
      } else {
        navigate(from || "/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <section style={styles.container}>
        {/* Logo */}
        <div style={styles.logoArea}>
          <span style={styles.logoIcon}>🎓</span>
          <h1 style={styles.logoText}>LMS Portal</h1>
        </div>

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to continue learning</p>

        {/* Error Alert */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={styles.submitBtn}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footer}>
          <Link to="/" style={styles.footerLink}>← Back to Home</Link>
        </p>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },

  container: {
    width: "100%",
    maxWidth: "420px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-xl)",
    padding: "40px 36px",
    boxShadow: "var(--shadow-lg)",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
    justifyContent: "center",
  },

  logoIcon: {
    fontSize: "2rem",
  },

  logoText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
  },

  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    textAlign: "center",
    marginBottom: "6px",
  },

  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "28px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  submitBtn: {
    width: "100%",
    padding: "13px",
    marginTop: "4px",
    fontSize: "0.95rem",
    fontWeight: "600",
    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
    boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
  },

  demoCreds: {
    marginTop: "24px",
    padding: "14px 16px",
    background: "rgba(99, 102, 241, 0.06)",
    border: "1px solid rgba(99,102,241,0.15)",
    borderRadius: "var(--radius-md)",
  },

  demoTitle: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--color-primary-light)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "6px",
  },

  demoText: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginBottom: "2px",
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
  },

  footerLink: {
    color: "var(--text-muted)",
    fontSize: "0.85rem",
    transition: "color 150ms ease",
  },
};
