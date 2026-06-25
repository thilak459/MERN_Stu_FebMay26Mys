// src/components/ProtectedRoute.jsx

/*
=========================================================
PROTECTED ROUTE

TOPICS COVERED:

✓ Conditional Rendering
✓ Navigate
✓ Authentication Checks
✓ Role-based Authorization

Mirrors ProtectedRoute from W12/bookmyshow-frontend.

=========================================================
*/

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  /*
  ------------------------------------------------
  SESSION RESTORATION IN PROGRESS
  ------------------------------------------------
  */

  if (loading) {
    return <p style={{ color: "var(--text-secondary)", padding: "40px", textAlign: "center" }}>Restoring session...</p>;
  }

  /*
  ------------------------------------------------
  USER NOT LOGGED IN
  ------------------------------------------------
  */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /*
  ------------------------------------------------
  ROLE CHECK

  Example:
  requiredRole = "admin"
  user.role    = "student"
  ↓
  Redirect to /
  ------------------------------------------------
  */

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
