// src/main.jsx

/*
=========================================================
SPRINT 2 – AUTH PROVIDER INTEGRATION

TOPICS COVERED:

✓ BrowserRouter
✓ Global Providers
✓ Context Provider Composition

WHY THIS FILE?

Providers should wrap the application once.

BrowserRouter
↓
AuthProvider
↓
Entire Application

This allows every component to access:

✓ Routing
✓ Authentication

=========================================================
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
);

/*
=========================================================
APPLICATION TREE

BrowserRouter
↓
AuthProvider
↓
App
↓
Pages
↓
Components

=========================================================

KEY TAKEAWAYS

1. Providers should live near the root.

2. Auth becomes globally available.

3. Components don't require prop drilling.

=========================================================
*/
