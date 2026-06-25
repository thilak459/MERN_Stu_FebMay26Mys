// src/pages/Login.jsx

/*
=========================================================
SPRINT 2 – REAL LOGIN INTEGRATION


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
authenticated experience.


Sprint 1:


Login Form
↓
console.log()


Sprint 2:


Login Form
↓
loginUser()
↓
JWT Received
↓
AuthContext Updated
↓
Session Persisted
↓
Protected Routes Unlocked


IMPLEMENTATION NOTES


• Uses loginUser() from authApi.js
• Uses AuthContext.login()
• Prevents duplicate submissions
• Preserves backend error messages
• Redirects based on role


KEY TAKEAWAYS


Pages manage UI.


API files manage communication.


Context manages authentication state.


=========================================================
*/

import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../api/authApi";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    /*
    -----------------------------------------
    CLIENT VALIDATION
    -----------------------------------------
    */

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");

      return;
    }

    /*
    -----------------------------------------
    PREVENT DUPLICATE SUBMISSIONS
    -----------------------------------------
    */

    if (loading) return;

    try {
      setLoading(true);

      const response = await loginUser(form);

      /*
      ACTUAL BACKEND RESPONSE


      {
        success: true,
        message: "Login successful",
        data: {
          token,
          user
        }
      }
      */

      const token = response.data?.token;

      const user = response.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response received.");
      }

      /*
      -----------------------------------------
      UPDATE AUTH CONTEXT
      -----------------------------------------
      */

      login(token, user);

      /*
      -----------------------------------------
      ROLE-BASED REDIRECTION
      -----------------------------------------
      */

      const from =
        location.state?.from?.pathname;

      if (user.role === "admin") {
        navigate(
          from || "/admin/dashboard",
          { replace: true }
        );
      } else {
        navigate(
          from || "/",
          { replace: true }
        );
      }

    } catch (error) {
      setError(
        error.message || error.response?.data?.message || "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>Login</h1>

      <p style={styles.subtitle}>Welcome back to BookMyShow.</p>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={styles.footer}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "70px auto",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  title: {
    textAlign: "center",
    color: "#111827",
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px",
    fontSize: "16px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  input: {
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    backgroundColor: "#1e40af",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  },

  error: {
    marginBottom: "20px",
    padding: "12px",
    background: "#fef2f2",
    color: "#dc2626",
    borderRadius: "10px",
    border: "1px solid #fecaca",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#6b7280",
  },
};

/*
=========================================================
LOGIN FLOW


User
↓
Enter Credentials
↓
Submit
↓
loginUser()
↓
Backend Validation
↓
JWT Returned
↓
AuthContext.login()
↓
localStorage Updated
↓
Role Check


Admin
↓
/admin/dashboard


User
↓
/


=========================================================


VERIFICATION


✓ Controlled inputs


✓ Uses loginUser()


✓ Uses AuthContext


✓ Prevents duplicate submissions


✓ JWT persisted


✓ User persisted


✓ Role-based redirection


✓ Backend contract verified


✓ Production-oriented MVP


=========================================================
*/