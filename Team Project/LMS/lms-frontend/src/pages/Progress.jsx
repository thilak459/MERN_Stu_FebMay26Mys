// src/pages/Progress.jsx

/*
=========================================================
PROGRESS PAGE – LMS

TOPICS COVERED:

✓ useParams
✓ useEffect
✓ useState
✓ API Integration
✓ Mark Lesson Complete

WHY THIS COMPONENT?

Displays progress for a specific enrolled course.
Allows students to mark lessons as complete.

Backend Endpoints:
GET  /progress/:courseId
POST /progress/:courseId/lesson  (body: { lessonId })

=========================================================
*/

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseProgress, markLessonComplete } from "../api/progressApi";
import { getCourseDetails } from "../api/courseApi";
import LoadingSpinner from "../components/LoadingSpinner";

/*
=========================================================
MOCK LESSONS

Since the backend stores lesson IDs as numbers
but doesn't return lesson content, we define
mock lessons here for UI demonstration.

=========================================================
*/

const MOCK_LESSONS = [
  { id: 1, title: "Introduction & Setup",         duration: "10 min" },
  { id: 2, title: "Core Concepts",                duration: "20 min" },
  { id: 3, title: "Hands-on Practice",            duration: "30 min" },
  { id: 4, title: "Advanced Topics",              duration: "25 min" },
  { id: 5, title: "Project: Build Something Real", duration: "45 min" },
];

export default function Progress() {
  const { courseId } = useParams();
  const navigate     = useNavigate();

  const [course,           setCourse]           = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [markingLesson,    setMarkingLesson]    = useState(null);
  const [error,            setError]            = useState("");
  const [message,          setMessage]          = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [courseData, progressData] = await Promise.all([
          getCourseDetails(courseId),
          getCourseProgress(courseId),
        ]);

        setCourse(courseData);
        setCompletedLessons(progressData.completedLessons || []);
      } catch (err) {
        setError(err.message || "Failed to load progress.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId]);

  async function handleMarkComplete(lessonId) {
    try {
      setMarkingLesson(lessonId);
      setError("");
      setMessage("");

      const data = await markLessonComplete(courseId, lessonId);
      setCompletedLessons(data.progress.completedLessons);
      setMessage(`✅ Lesson ${lessonId} marked as complete!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setMarkingLesson(null);
    }
  }

  if (loading) return <LoadingSpinner message="Loading your progress..." />;

  const progressPct = Math.round((completedLessons.length / MOCK_LESSONS.length) * 100);

  return (
    <section className="page-container">
      {/* BACK */}
      <button style={styles.backBtn} onClick={() => navigate("/my-enrollments")}>
        ← My Enrollments
      </button>

      {/* ALERTS */}
      {error   && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            {course?.title || `Course #${courseId}`}
          </h1>
          <p style={styles.subtitle}>Your learning progress</p>
        </div>

        <div style={styles.progressCircle}>
          <span style={styles.progressPercent}>{progressPct}%</span>
          <span style={styles.progressLabel}>Complete</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={styles.progressSection}>
        <div style={styles.progressInfo}>
          <span style={styles.progressText}>
            {completedLessons.length} / {MOCK_LESSONS.length} lessons completed
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* LESSONS LIST */}
      <div style={styles.lessonsList}>
        <h2 style={styles.lessonsTitle}>Course Lessons</h2>

        {MOCK_LESSONS.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isMarking   = markingLesson === lesson.id;

          return (
            <div key={lesson.id} style={{
              ...styles.lessonItem,
              borderColor: isCompleted ? "rgba(16,185,129,0.3)" : "var(--border-card)",
              background: isCompleted ? "rgba(16,185,129,0.05)" : "var(--bg-card)",
            }}>
              <div style={styles.lessonLeft}>
                <div style={{
                  ...styles.lessonNumber,
                  background: isCompleted ? "rgba(16,185,129,0.2)" : "rgba(99,102,241,0.1)",
                  color: isCompleted ? "var(--color-accent)" : "var(--color-primary-light)",
                }}>
                  {isCompleted ? "✓" : lesson.id}
                </div>

                <div>
                  <p style={{
                    ...styles.lessonTitle,
                    color: isCompleted ? "var(--text-secondary)" : "var(--text-primary)",
                  }}>
                    {isCompleted ? <s>{lesson.title}</s> : lesson.title}
                  </p>
                  <p style={styles.lessonDuration}>⏱ {lesson.duration}</p>
                </div>
              </div>

              {!isCompleted && (
                <button
                  id={`btn-complete-lesson-${lesson.id}`}
                  className="btn btn-success"
                  onClick={() => handleMarkComplete(lesson.id)}
                  disabled={isMarking}
                  style={styles.completeBtn}
                >
                  {isMarking ? "Marking..." : "Mark Complete"}
                </button>
              )}

              {isCompleted && (
                <span style={styles.completedTag}>✅ Done</span>
              )}
            </div>
          );
        })}
      </div>

      {/* COMPLETION BANNER */}
      {progressPct === 100 && (
        <div style={styles.completionBanner}>
          <span style={styles.completionIcon}>🏆</span>
          <div>
            <h3 style={styles.completionTitle}>Course Complete!</h3>
            <p style={styles.completionText}>Congratulations! You've completed all lessons.</p>
          </div>
        </div>
      )}
    </section>
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
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "20px",
  },

  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
  },

  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    margin: "4px 0 0",
  },

  progressCircle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90px",
    height: "90px",
    background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(16,185,129,0.15))",
    border: "2px solid rgba(99,102,241,0.3)",
    borderRadius: "50%",
  },

  progressPercent: {
    fontSize: "1.4rem",
    fontWeight: "800",
    color: "var(--color-primary-light)",
    lineHeight: "1",
  },

  progressLabel: {
    fontSize: "0.65rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  progressSection: {
    marginBottom: "36px",
    padding: "20px 24px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
  },

  progressText: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
  },

  lessonsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "32px",
  },

  lessonsTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },

  lessonItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-md)",
    gap: "16px",
    transition: "all 200ms ease",
  },

  lessonLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flex: 1,
  },

  lessonNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: "700",
    flexShrink: 0,
  },

  lessonTitle: {
    fontSize: "0.9rem",
    fontWeight: "500",
    margin: 0,
  },

  lessonDuration: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    margin: "2px 0 0",
  },

  completeBtn: {
    padding: "7px 14px",
    fontSize: "0.8rem",
    flexShrink: 0,
  },

  completedTag: {
    fontSize: "0.8rem",
    color: "var(--color-accent)",
    fontWeight: "600",
    flexShrink: 0,
  },

  completionBanner: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "24px 28px",
    background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(99,102,241,0.15))",
    border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: "var(--radius-xl)",
  },

  completionIcon: {
    fontSize: "3rem",
    flexShrink: 0,
  },

  completionTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--color-accent)",
    margin: 0,
  },

  completionText: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    margin: "4px 0 0",
  },
};
