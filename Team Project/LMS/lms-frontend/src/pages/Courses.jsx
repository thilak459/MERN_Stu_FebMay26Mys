// src/pages/Courses.jsx

/*
=========================================================
COURSES PAGE – LMS

TOPICS COVERED:

✓ useEffect
✓ useState
✓ useDispatch / useSelector
✓ Filters (category, difficulty)
✓ Redux Integration

WHY THIS COMPONENT?

Browse all available LMS courses.
Mirrors Movies.jsx from W12/bookmyshow-frontend.

Backend Endpoint:
GET /courses?category=web&difficulty=beginner

=========================================================
*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchCourses } from "../redux/courses/coursesSlice";

const CATEGORIES  = ["", "web", "programming", "data", "design"];
const DIFFICULTIES = ["", "beginner", "intermediate", "advanced"];

export default function Courses() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { courses, loading, error } = useSelector((state) => state.courses);

  const [category,   setCategory]   = useState(searchParams.get("category") || "");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const filters = {};
    if (category)   filters.category   = category;
    if (difficulty) filters.difficulty = difficulty;
    dispatch(fetchCourses(filters));
  }, [dispatch, category, difficulty]);

  return (
    <section className="page-container">
      {/* HEADER */}
      <h1 className="section-title">Courses</h1>
      <p className="section-subtitle">
        Discover and explore our curated learning library
      </p>

      {/* FILTERS */}
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Category</label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            <option value="web">🌐 Web Development</option>
            <option value="programming">💻 Programming</option>
            <option value="data">📊 Data Science</option>
            <option value="design">🎨 Design</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Difficulty</label>
          <select
            id="filter-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={styles.select}
          >
            <option value="">All Levels</option>
            <option value="beginner">🟢 Beginner</option>
            <option value="intermediate">🟡 Intermediate</option>
            <option value="advanced">🔴 Advanced</option>
          </select>
        </div>

        {/* Active filter chips */}
        {(category || difficulty) && (
          <div style={styles.activeFilters}>
            {category && (
              <span className="badge badge-primary">
                {category} ×
              </span>
            )}
            {difficulty && (
              <span className="badge badge-primary">
                {difficulty} ×
              </span>
            )}
            <button
              style={styles.clearBtn}
              onClick={() => { setCategory(""); setDifficulty(""); }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* STATE: Loading */}
      {loading && <LoadingSpinner message="Loading courses..." />}

      {/* STATE: Error */}
      {error && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}

      {/* STATE: Empty */}
      {!loading && !error && courses.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>🔍</p>
          <p style={styles.emptyText}>No courses found for your filters.</p>
          <button
            className="btn btn-secondary"
            onClick={() => { setCategory(""); setDifficulty(""); }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* COURSES GRID */}
      {!loading && !error && courses.length > 0 && (
        <>
          <p style={styles.resultCount}>
            Showing <strong>{courses.length}</strong> course{courses.length !== 1 ? "s" : ""}
          </p>
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  filters: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "flex-end",
    marginBottom: "32px",
    padding: "20px 24px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
  },

  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  filterLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  select: {
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-sm)",
    padding: "8px 12px",
    fontSize: "0.875rem",
    minWidth: "170px",
    cursor: "pointer",
  },

  activeFilters: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: "auto",
  },

  clearBtn: {
    background: "transparent",
    color: "var(--text-muted)",
    border: "none",
    fontSize: "0.8rem",
    cursor: "pointer",
    textDecoration: "underline",
  },

  resultCount: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
    marginBottom: "16px",
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  emptyIcon: {
    fontSize: "3rem",
  },

  emptyText: {
    color: "var(--text-secondary)",
    fontSize: "1rem",
    marginBottom: "8px",
  },
};
