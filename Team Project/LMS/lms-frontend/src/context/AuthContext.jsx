// src/context/AuthContext.jsx

/*
=========================================================
SPRINT 2 – AUTHENTICATION CONTEXT

TOPICS COVERED:

✓ Context API
✓ createContext()
✓ useContext()
✓ useState()
✓ useEffect()
✓ useMemo()
✓ Custom Hooks
✓ Session Persistence
✓ JWT Management

WHY THIS FILE?

Authentication information is needed
throughout the LMS application.

Examples:

Navbar
↓
Show Login / Logout

ProtectedRoute
↓
Access Control

Admin Routes
↓
Role Validation (admin vs student)

=========================================================
*/

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/*
=========================================================
CREATE AUTH CONTEXT

This becomes the global container
for authentication information.

=========================================================
*/

export const AuthContext = createContext(null);

/*
=========================================================
AUTH PROVIDER

Wraps the application and exposes
authentication state.

=========================================================
*/

export function AuthProvider({ children }) {
  /*
  =====================================================
  AUTHENTICATION STATE

  user:
  Stores currently logged-in user.

  token:
  Stores JWT.

  loading:
  Indicates whether authentication
  restoration is in progress.

  =====================================================
  */

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  =====================================================
  SESSION RESTORATION

  Runs once when the application starts.

  Restores authentication from localStorage.

  =====================================================
  */

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("lms_token");
      const storedUser = localStorage.getItem("lms_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore authentication:", error);
      localStorage.removeItem("lms_token");
      localStorage.removeItem("lms_user");
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  =====================================================
  LOGIN

  Receives: token, user
  Updates:  State + localStorage

  =====================================================
  */

  function login(authToken, userData) {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem("lms_token", authToken);
    localStorage.setItem("lms_user", JSON.stringify(userData));
  }

  /*
  =====================================================
  LOGOUT

  Clears: State + localStorage

  =====================================================
  */

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
  }

  /*
  =====================================================
  DERIVED STATE

  Authentication can be derived from token.

  =====================================================
  */

  const isAuthenticated = Boolean(token);

  /*
  =====================================================
  CONTEXT VALUE

  useMemo prevents unnecessary object recreation.

  =====================================================
  */

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout,
    }),
    [user, token, loading, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/*
=========================================================
CUSTOM HOOK

Instead of: useContext(AuthContext) everywhere,
we expose: useAuth()

=========================================================
*/

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
