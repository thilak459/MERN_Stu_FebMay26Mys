// src/redux/courses/coursesSlice.js

/*
=========================================================
COURSES SLICE

TOPICS COVERED:

✓ createSlice
✓ createAsyncThunk
✓ Async State Management
✓ Error Handling

WHY THIS FILE?

Manages global courses state.

Mirrors the moviesSlice pattern
from W12/bookmyshow-frontend.

State Shape:
{
  courses: [],
  loading: false,
  error: null
}

=========================================================
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses } from "../../api/courseApi";

/*
=========================================================
ASYNC THUNK – fetchCourses

Dispatches:
  pending   → loading = true
  fulfilled → courses populated
  rejected  → error set

=========================================================
*/

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await getAllCourses(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*
=========================================================
COURSES SLICE
=========================================================
*/

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH COURSES */
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = coursesSlice.actions;

export default coursesSlice.reducer;
