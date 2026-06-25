// src/api/authApi.js

/*
=========================================================
AUTHENTICATION API LAYER

TOPICS COVERED:

✓ Axios Service Functions
✓ Backend Contract Consumption
✓ Error Normalization
✓ Reusable API Architecture

WHY THIS FILE EXISTS

This file centralizes all authentication-related
backend communication.

Pages invoke these reusable functions
instead of scattering axios calls.

Backend Endpoint:
POST /auth/login

Request:
{ username, password }

Response:
{
  message: "Login successful",
  token: "...",
  user: { id, username, role }
}

=========================================================
*/

import api from "./axios";

/*
=========================================================
LOGIN USER
=========================================================
*/

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/*
=========================================================
KEY TAKEAWAYS

Pages manage UI.
API files manage communication.
=========================================================
*/
