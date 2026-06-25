// src/pages/admin/CourseManagement.jsx

/*
=========================================================
COURSE MANAGEMENT PAGE – LMS ADMIN

TOPICS COVERED:

✓ CRUD Operations
✓ API Integration
✓ useState
✓ useEffect
✓ Form Handling
✓ Loading State

WHY THIS COMPONENT?

Allows admins to Create, Read, Update, Delete
courses in the LMS system.

Mirrors MovieManagement.jsx from W12/bookmyshow-frontend.

Backend Endpoints:
GET    /courses
POST   /courses
PUT    /courses/:id
DELETE /courses/:id

=========================================================
*/

import { useEffect, useState } from "react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "../../api/courseApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const EMPTY_FORM = {
  title:       "",
  category:    "web",
  difficulty:  "beginner",
  description: "",
};

export default function CourseManagement() {
  const [courses,    setCourses]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [message,    setMessage]    = useState("");
  const [showForm,   setShowForm]   = useState(false);
  const [editCourse, setEditCourse] = useState(null); // null = create, object = edit
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  async function fetchAllCourses() {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(course) {
    setEditCourse(course);
    setForm({
      title:       course.title,
      category:    course.category,
      difficulty:  course.difficulty,
      description: course.description || "",
    });
    setShowForm(true);
    setError("");
    setMessage("");
  }

  function handleAdd() {
    setEditCourse(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setError("");
    setMessage("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.title.trim() || !form.category || !form.difficulty) {
      setError("Title, category, and difficulty are required.");
      return;
    }

    try {
      setSubmitting(true);

      if (editCourse) {
        const updated = await updateCourse(editCourse.id, form);
        setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setMessage("✅ Course updated successfully!");
      } else {
        const created = await createCourse(form);
        setCourses((prev) => [...prev, created]);
        setMessage("🎉 Course created successfully!");
      }

      setShowForm(false);
      setEditCourse(null);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this course? This action cannot be undone.")) return;

    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      setMessage("✅ Course deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <LoadingSpinner message="Loading courses..." />;

  return (
    <section className="page-container">
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">Course Management</h1>
          <p className="section-subtitle">Create, edit and delete courses</p>
        </div>

        <button
          id="btn-add-new-course"
          className="btn btn-primary"
          onClick={handleAdd}
          style={styles.addBtn}
        >
          + Add Course
        </button>
      </div>

      {/* ALERTS */}
      {error   && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* FORM PANEL */}
      {showForm && (
        <div style={styles.formPanel}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {editCourse ? "Edit Course" : "New Course"}
            </h2>
            <button
              style={styles.closeBtn}
              onClick={() => { setShowForm(false); setError(""); }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form} id="course-form">
            <div className="form-group">
              <label className="form-label" htmlFor="title">Course Title *</label>
              <input
                id="title"
                name="title"
                className="form-input"
                placeholder="e.g. Introduction to React"
                value={form.title}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>

            <div style={styles.formRow}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label" htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={form.category}
                  onChange={handleChange}
                  disabled={submitting}
                  style={{ width: "100%" }}
                >
                  <option value="web">Web Development</option>
                  <option value="programming">Programming</option>
                  <option value="data">Data Science</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label" htmlFor="difficulty">Difficulty *</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  className="form-input"
                  value={form.difficulty}
                  onChange={handleChange}
                  disabled={submitting}
                  style={{ width: "100%" }}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                placeholder="Brief course description..."
                value={form.description}
                onChange={handleChange}
                disabled={submitting}
                rows={3}
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={styles.formActions}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { setShowForm(false); setError(""); }}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                id="btn-submit-course"
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Saving..." : (editCourse ? "Update Course" : "Create Course")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* COURSES TABLE */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <span>ID</span>
          <span>Title</span>
          <span>Category</span>
          <span>Difficulty</span>
          <span>Description</span>
          <span>Actions</span>
        </div>

        {courses.map((course) => (
          <div key={course.id} style={styles.tableRow}>
            <span style={styles.tableId}>#{course.id}</span>
            <span style={styles.tableTitle}>{course.title}</span>
            <span>
              <span className="badge badge-primary">{course.category}</span>
            </span>
            <span>
              <span className={`badge badge-${course.difficulty}`}>
                {course.difficulty}
              </span>
            </span>
            <span style={styles.tableDesc}>
              {course.description || "—"}
            </span>
            <span style={styles.tableActions}>
              <button
                id={`btn-edit-course-${course.id}`}
                style={styles.editBtn}
                onClick={() => handleEdit(course)}
              >
                ✏️ Edit
              </button>
              <button
                id={`btn-delete-course-${course.id}`}
                style={styles.deleteBtn}
                onClick={() => handleDelete(course.id)}
              >
                🗑️ Delete
              </button>
            </span>
          </div>
        ))}

        {courses.length === 0 && (
          <p style={styles.noData}>No courses yet. Add your first course!</p>
        )}
      </div>
    </section>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },

  addBtn: {
    padding: "10px 20px",
  },

  formPanel: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-xl)",
    padding: "28px",
    marginBottom: "24px",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  formTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "var(--radius-sm)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  formRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  formActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    paddingTop: "8px",
  },

  tableContainer: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 120px 130px 1fr 180px",
    gap: "12px",
    padding: "14px 20px",
    background: "rgba(99,102,241,0.08)",
    borderBottom: "1px solid var(--border-card)",
    fontSize: "0.7rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 120px 130px 1fr 180px",
    gap: "12px",
    padding: "14px 20px",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    fontSize: "0.875rem",
    transition: "background 150ms ease",
  },

  tableId: {
    color: "var(--text-muted)",
    fontSize: "0.8rem",
  },

  tableTitle: {
    fontWeight: "500",
    color: "var(--text-primary)",
  },

  tableDesc: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  tableActions: {
    display: "flex",
    gap: "6px",
  },

  editBtn: {
    padding: "4px 10px",
    background: "rgba(99,102,241,0.1)",
    color: "var(--color-primary-light)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: "500",
  },

  deleteBtn: {
    padding: "4px 10px",
    background: "rgba(239,68,68,0.1)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: "500",
  },

  noData: {
    padding: "40px",
    textAlign: "center",
    color: "var(--text-muted)",
  },
};
