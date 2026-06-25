// src/pages/CourseDetails.jsx

/*
=========================================================
COURSE DETAILS PAGE – LMS

TOPICS COVERED:

✓ useParams
✓ useEffect
✓ useState
✓ API Integration
✓ Enroll / Withdraw
✓ Loading State
✓ Error Handling

WHY THIS COMPONENT?

Displays full course details and allows
students to enroll or withdraw.

Mirrors MovieDetails.jsx from W12/bookmyshow-frontend.

Backend Endpoints:
GET    /courses/:id
POST   /enroll/:courseId
DELETE /enroll/:courseId

=========================================================
*/

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseDetails } from "../api/courseApi";
import { enrollCourse, withdrawCourse, getMyEnrollments } from "../api/enrollApi";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const DIFFICULTY_CONFIG = {
  beginner:     { badge: "badge badge-beginner",     icon: "🟢" },
  intermediate: { badge: "badge badge-intermediate", icon: "🟡" },
  advanced:     { badge: "badge badge-advanced",     icon: "🔴" },
};

const CATEGORY_ICON = {
  web:         "🌐",
  programming: "💻",
  data:        "📊",
  design:      "🎨",
  default:     "📚",
};

export default function CourseDetails() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course,      setCourse]      = useState(null);
  const [isEnrolled,  setIsEnrolled]  = useState(false);
  const [loading,     setLoading]     = useState(true);
  const [actionLoad,  setActionLoad]  = useState(false);
  const [error,       setError]       = useState("");
  const [message,     setMessage]     = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const courseData = await getCourseDetails(id);
        setCourse(courseData);

        if (isAuthenticated) {
          const enrollments = await getMyEnrollments();
          const enrolled = enrollments.some((e) => e.courseId === parseInt(id));
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        setError(err.message || "Failed to load course.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isAuthenticated]);

  async function handleEnroll() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setActionLoad(true);
      setError("");
      setMessage("");

      await enrollCourse(id);
      setIsEnrolled(true);
      setMessage("🎉 Successfully enrolled in this course!");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoad(false);
    }
  }

  async function handleWithdraw() {
    try {
      setActionLoad(true);
      setError("");
      setMessage("");

      await withdrawCourse(id);
      setIsEnrolled(false);
      setMessage("✅ Successfully withdrawn from this course.");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoad(false);
    }
  }

  if (loading) return <LoadingSpinner message="Loading course details..." />;

  if (error && !course) {
    return (
      <section className="page-container">
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/courses")}>
          ← Back to Courses
        </button>
      </section>
    );
  }

  if (!course) return null;

  const diffConfig = DIFFICULTY_CONFIG[course.difficulty] || DIFFICULTY_CONFIG["beginner"];
  const catIcon    = CATEGORY_ICON[course.category]      || CATEGORY_ICON["default"];

  return (
    <section className="page-container">
      {/* BACK BUTTON */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/courses")}
      >
        ← Back to Courses
      </button>

      {/* ALERTS */}
      {error   && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* COURSE HEADER */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconWrapper}>
            <span style={styles.catIcon}>{catIcon}</span>
          </div>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.badgeRow}>
            <span className={diffConfig.badge}>
              {diffConfig.icon} {course.difficulty}
            </span>
            <span style={styles.categoryTag}>{course.category}</span>
          </div>

          <h1 style={styles.title}>{course.title}</h1>

          <p style={styles.description}>{course.description}</p>

          {/* ENROLL / WITHDRAW BUTTON */}
          <div style={styles.ctaRow}>
            {!isAuthenticated ? (
              <button
                id="btn-login-to-enroll"
                className="btn btn-primary"
                onClick={() => navigate("/login")}
                style={styles.ctaBtn}
              >
                Login to Enroll
              </button>
            ) : isEnrolled ? (
              <>
                <div style={styles.enrolledBadge}>
                  ✅ Enrolled
                </div>
                <button
                  id="btn-track-progress"
                  className="btn btn-success"
                  onClick={() => navigate(`/progress/${course.id}`)}
                  style={styles.ctaBtn}
                >
                  📈 Track Progress
                </button>
                <button
                  id="btn-withdraw"
                  className="btn btn-danger"
                  onClick={handleWithdraw}
                  disabled={actionLoad}
                  style={{ ...styles.ctaBtn, padding: "10px 18px" }}
                >
                  {actionLoad ? "Withdrawing..." : "Withdraw"}
                </button>
              </>
            ) : (
              <button
                id="btn-enroll"
                className="btn btn-primary"
                onClick={handleEnroll}
                disabled={actionLoad}
                style={styles.ctaBtn}
              >
                {actionLoad ? "Enrolling..." : "🚀 Enroll Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* COURSE META */}
      <div style={styles.metaGrid}>
        <MetaItem icon="🏷️" label="Category" value={course.category} />
        <MetaItem icon="📊" label="Difficulty" value={course.difficulty} />
        <MetaItem icon="🆔" label="Course ID" value={`#${course.id}`} />
      </div>
    </section>
  );
}

function MetaItem({ icon, label, value }) {
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaIcon}>{icon}</span>
      <div>
        <p style={styles.metaLabel}>{label}</p>
        <p style={styles.metaValue}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "none",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginBottom: "24px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  header: {
    display: "flex",
    gap: "32px",
    marginBottom: "40px",
    padding: "32px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-xl)",
    flexWrap: "wrap",
  },

  headerLeft: {
    flexShrink: 0,
  },

  iconWrapper: {
    width: "80px",
    height: "80px",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  catIcon: {
    fontSize: "2.5rem",
  },

  headerRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  badgeRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  categoryTag: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--border-card)",
    padding: "3px 10px",
    borderRadius: "var(--radius-full)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },

  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    lineHeight: "1.3",
    margin: 0,
  },

  description: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    margin: 0,
  },

  ctaRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "8px",
  },

  ctaBtn: {
    padding: "12px 24px",
    fontSize: "0.95rem",
    fontWeight: "600",
  },

  enrolledBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    background: "rgba(16, 185, 129, 0.15)",
    color: "var(--color-accent)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.875rem",
    fontWeight: "600",
    border: "1px solid rgba(16,185,129,0.3)",
  },

  metaGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-md)",
    flex: "1 1 140px",
  },

  metaIcon: {
    fontSize: "1.5rem",
  },

  metaLabel: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
    margin: 0,
  },

  metaValue: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
    textTransform: "capitalize",
  },
};
