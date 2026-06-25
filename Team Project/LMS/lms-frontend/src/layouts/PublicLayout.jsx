// src/layouts/PublicLayout.jsx

/*
=========================================================
PUBLIC LAYOUT

TOPICS COVERED:

✓ Nested Routing
✓ Outlet
✓ Layout Components
✓ Shared UI

WHY THIS COMPONENT?

All public pages share:

Navbar
↓
Page Content

Without layouts:
Navbar gets repeated in every page.
Layouts eliminate duplication.

=========================================================
*/

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PublicLayout() {
  return (
    <>
      {/* SHARED PUBLIC NAVIGATION */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main style={styles.container}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
  },
};
