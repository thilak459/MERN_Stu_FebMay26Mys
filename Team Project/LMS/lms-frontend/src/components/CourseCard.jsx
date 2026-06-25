// src/components/CourseCard.jsx

/*
=========================================================
COURSE CARD

Displays a single course with:
- Title, category, difficulty badge
- Description
- Enroll / View Progress button

Mirrors MovieCard from W12 bookmyshow-frontend.

=========================================================
*/

import { useNavigate } from "react-router-dom";

const DIFFICULTY_BADGE = {
  beginner:     { label: "Beginner",     className: "badge badge-beginner" },
  intermediate: { label: "Intermediate", className: "badge badge-intermediate" },
  advanced:     { label: "Advanced",     className: "badge badge-advanced" },
};

const CATEGORY_ICON = {
  web:         "🌐",
  programming: "💻",
  design:      "🎨",
  data:        "📊",
  default:     "📚",
};

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const badge = DIFFICULTY_BADGE[course.difficulty] || DIFFICULTY_BADGE["beginner"];
  const icon  = CATEGORY_ICON[course.category] || CATEGORY_ICON["default"];

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/courses/${course.id}`)}
      id={`course-card-${course.id}`}
    >
      {/* Category Icon */}
      <div style={styles.iconArea}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.category}>{course.category}</span>
      </div>

      {/* Difficulty Badge */}
      <div style={styles.badgeRow}>
        <span className={badge.className}>{badge.label}</span>
      </div>

      {/* Course Info */}
      <h3 style={styles.title}>{course.title}</h3>
      <p style={styles.description}>{course.description}</p>

      {/* CTA */}
      <button
        style={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/courses/${course.id}`);
        }}
      >
        View Course →
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    cursor: "pointer",
    transition: "all 250ms ease",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "relative",
    overflow: "hidden",
  },

  iconArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  icon: {
    fontSize: "1.75rem",
  },

  category: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: "600",
  },

  badgeRow: {
    marginTop: "4px",
  },

  title: {
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    lineHeight: "1.4",
  },

  description: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    flex: 1,
  },

  button: {
    marginTop: "8px",
    padding: "8px 16px",
    background: "rgba(99, 102, 241, 0.15)",
    color: "var(--color-primary-light)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 150ms ease",
    alignSelf: "flex-start",
  },
};
