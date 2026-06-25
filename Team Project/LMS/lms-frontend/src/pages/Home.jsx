// src/pages/Home.jsx

/*
=========================================================
HOME PAGE – LMS PORTAL

TOPICS COVERED:

✓ Functional Components
✓ JSX
✓ useNavigate
✓ Event Handling

WHY THIS COMPONENT?

Landing page for the LMS platform.

Mirrors Home.jsx from W12/bookmyshow-frontend.

Responsibilities:

✓ Introduce the platform
✓ Guide users to major sections
✓ Act as the entry point

=========================================================
*/

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate  = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="page-container">
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>🎓 Learning Management System</div>

        <h1 style={styles.heroTitle}>
          Master New Skills.{" "}
          <span style={styles.heroHighlight}>Learn at Your Pace.</span>
        </h1>

        <p style={styles.heroSubtitle}>
          Browse curated courses in web development, programming, data science and more.
          Enroll, track your progress, and become a better developer — all in one place.
        </p>

        <div style={styles.heroActions}>
          <button
            id="btn-explore-courses"
            style={styles.primaryButton}
            onClick={() => navigate("/courses")}
          >
            🚀 Explore Courses
          </button>

          {!isAuthenticated && (
            <button
              id="btn-get-started"
              style={styles.secondaryButton}
              onClick={() => navigate("/login")}
            >
              Get Started →
            </button>
          )}

          {isAuthenticated && (
            <button
              id="btn-my-enrollments"
              style={styles.secondaryButton}
              onClick={() => navigate("/my-enrollments")}
            >
              My Enrollments →
            </button>
          )}
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} style={styles.statItem}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>What You Can Do</h2>
        <p style={styles.sectionSubtitle}>Everything you need to grow as a developer</p>

        <div style={styles.featureGrid}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Browse by Category</h2>
        <div style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              style={styles.categoryCard}
              onClick={() => navigate(`/courses?category=${cat.key}`)}
              id={`cat-${cat.key}`}
            >
              <span style={styles.categoryIcon}>{cat.icon}</span>
              <span style={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
}

/* =====================================================
   DATA
   ===================================================== */

const STATS = [
  { value: "3+",  label: "Courses" },
  { value: "2",   label: "Categories" },
  { value: "3",   label: "Difficulty Levels" },
  { value: "100%", label: "Free" },
];

const FEATURES = [
  {
    icon: "📚",
    title: "Browse Courses",
    description: "Explore a curated library of web and programming courses.",
  },
  {
    icon: "✅",
    title: "Enroll & Learn",
    description: "One-click enrollment. Start learning immediately.",
  },
  {
    icon: "📈",
    title: "Track Progress",
    description: "Mark lessons complete and track your learning journey.",
  },
  {
    icon: "🔐",
    title: "Secure Auth",
    description: "JWT-based authentication keeps your data safe.",
  },
];

const CATEGORIES = [
  { icon: "🌐", name: "Web Dev",     key: "web" },
  { icon: "💻", name: "Programming", key: "programming" },
  { icon: "📊", name: "Data Science", key: "data" },
  { icon: "🎨", name: "Design",       key: "design" },
];

/* =====================================================
   STYLES
   ===================================================== */

const styles = {
  hero: {
    textAlign: "center",
    padding: "60px 20px 80px",
    maxWidth: "780px",
    margin: "0 auto",
  },

  heroBadge: {
    display: "inline-block",
    padding: "6px 18px",
    background: "rgba(99, 102, 241, 0.12)",
    color: "var(--color-primary-light)",
    borderRadius: "var(--radius-full)",
    fontSize: "0.8rem",
    fontWeight: "600",
    letterSpacing: "0.05em",
    border: "1px solid rgba(99,102,241,0.2)",
    marginBottom: "24px",
  },

  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    lineHeight: "1.15",
    color: "var(--text-primary)",
    marginBottom: "20px",
    letterSpacing: "-0.02em",
  },

  heroHighlight: {
    background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroSubtitle: {
    fontSize: "1.1rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    marginBottom: "36px",
    maxWidth: "600px",
    margin: "0 auto 36px",
  },

  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "48px",
  },

  primaryButton: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 200ms ease",
    boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
  },

  secondaryButton: {
    padding: "14px 28px",
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 200ms ease",
  },

  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
    padding: "24px 0",
    borderTop: "1px solid var(--border-card)",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },

  statValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--color-primary-light)",
  },

  statLabel: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  featuresSection: {
    padding: "60px 0",
  },

  sectionTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "8px",
  },

  sectionSubtitle: {
    color: "var(--text-secondary)",
    fontSize: "0.95rem",
    marginBottom: "32px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  featureCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "all 250ms ease",
  },

  featureIcon: {
    fontSize: "2rem",
  },

  featureTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
  },

  featureDescription: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },

  categoriesSection: {
    padding: "0 0 60px",
  },

  categoryGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  categoryCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 20px",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all 200ms ease",
  },

  categoryIcon: {
    fontSize: "1.4rem",
  },

  categoryName: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "var(--text-secondary)",
  },
};
