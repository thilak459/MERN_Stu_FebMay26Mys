// src/redux/store.js

/*
=========================================================
REDUX STORE

TOPICS COVERED:

✓ configureStore
✓ Reducer Registration

WHY THIS FILE?

Single source of truth for global state.

=========================================================
*/

import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "./courses/coursesSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
