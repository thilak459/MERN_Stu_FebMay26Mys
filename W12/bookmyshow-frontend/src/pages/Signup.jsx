// src/pages/Signup.jsx
/*
=========================================================
SPRINT 2 – REAL SIGNUP INTEGRATION


TOPICS COVERED:


✓ Controlled Components
✓ useState
✓ Form Submission
✓ API Integration
✓ Loading State
✓ Error Handling
✓ useNavigate


WHY THIS COMPONENT?


Signup is the user's entry point into
the authentication system.


Sprint 1:


UI Shell
↓
console.log()


Sprint 2:


Signup Form
↓
registerUser()
↓
Backend Validation
↓
Success Feedback
↓
Login Page


IMPLEMENTATION NOTES


• Uses registerUser() from authApi.js
• Prevents duplicate submissions
• Preserves backend error messages
• Redirects users to login after success


KEY TAKEAWAYS


Pages manage UI.
API files manage communication.


=========================================================
*/


import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


import { registerUser } from "../api/authApi";


export default function Signup() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  const [success, setSuccess] = useState("");


  function handleChange(event) {
    const { name, value } = event.target;


    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();


    /*
    -----------------------------------------
    CLIENT VALIDATION
    -----------------------------------------
    */


    setError("");
    setSuccess("");


    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");


      return;
    }


    /*
    -----------------------------------------
    PREVENT DUPLICATE SUBMITS
    -----------------------------------------
    */


    if (loading) return;


    try {
      setLoading(true);


      const response = await registerUser(form);


      /*
      Expected Backend Response


      {
        success: true,
        message: "User registered successfully"
      }
      */


      setSuccess(response.message || "Registration successful.");


      /*
      -----------------------------------------
      REDIRECT TO LOGIN
      -----------------------------------------
      */


      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div style={styles.page}>
    <section style={styles.container}>
      <h1 style={styles.title}>Create Account</h1>


      <p style={styles.subtitle}>Join BookMyShow and start booking tickets.</p>


      {error && <div style={styles.error}>{error}</div>}


      {success && <div style={styles.success}>{success}</div>}


      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          required
          style={styles.input}
        />


        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
          style={styles.input}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
          style={styles.input}
        />


        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating Account..." : "Signup"}
        </button>
      </form>


      <p style={styles.footer}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section></div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #eff6ff, #ffffff)",
  },

  container: {
    width: "100%",
    maxWidth: "460px",
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

  success: {
    marginBottom: "20px",
    padding: "12px",
    background: "#ecfdf5",
    color: "#059669",
    borderRadius: "10px",
    border: "1px solid #a7f3d0",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#6b7280",
  },
};


/*
=========================================================
USER FLOW


Signup Page
↓
Fill Form
↓
Submit
↓
registerUser()
↓
Backend Validation


Success
↓
Show Message
↓
Redirect Login


Failure
↓
Display Backend Error


=========================================================


VERIFICATION


✓ Controlled inputs


✓ Uses registerUser()


✓ Prevents duplicate submissions


✓ Loading state implemented


✓ Backend errors preserved


✓ Success feedback shown


✓ Redirects to login


✓ OTP UI removed


✓ Production-oriented MVP


=========================================================
*/