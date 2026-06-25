// src/routes/AppRoutes.jsx

/*
=========================================================
ROUTING BRAIN – LMS FRONTEND

TOPICS COVERED:

✓ React Router v7
✓ Routes / Route
✓ Nested Routes
✓ Outlet-based Architecture
✓ React.lazy()
✓ Suspense
✓ Protected Routes
✓ 404 Routing

ROUTE ARCHITECTURE

PUBLIC

/
├── Home
├── Courses
├── Courses/:id   (CourseDetails)
├── Login

STUDENT (Protected)

/my-enrollments
/progress/:courseId

ADMIN (Protected – admin only)

/admin
├── dashboard
├── courses
└── enrollments

FALLBACK

*   (NotFound)

=========================================================
*/

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

/* SHARED */
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../components/ProtectedRoute";

/* LAYOUTS */
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

/* LAZY PAGES */
const Home             = lazy(() => import("../pages/Home"));
const Courses          = lazy(() => import("../pages/Courses"));
const CourseDetails    = lazy(() => import("../pages/CourseDetails"));
const Login            = lazy(() => import("../pages/Login"));
const MyEnrollments    = lazy(() => import("../pages/MyEnrollments"));
const Progress         = lazy(() => import("../pages/Progress"));
const NotFound         = lazy(() => import("../pages/NotFound"));

/* ADMIN PAGES */
const AdminDashboard   = lazy(() => import("../pages/admin/Dashboard"));
const CourseManagement = lazy(() => import("../pages/admin/CourseManagement"));
const EnrollmentsAdmin = lazy(() => import("../pages/admin/EnrollmentsAdmin"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>

        {/*
        =================================================
        PUBLIC ROUTES

        PublicLayout
        ↓
        Navbar
        ↓
        Outlet (page content)
        =================================================
        */}

        <Route element={<PublicLayout />}>
          <Route path="/"                  element={<Home />} />
          <Route path="/courses"           element={<Courses />} />
          <Route path="/courses/:id"       element={<CourseDetails />} />
          <Route path="/login"             element={<Login />} />

          {/* Student Protected */}
          <Route
            path="/my-enrollments"
            element={
              <ProtectedRoute>
                <MyEnrollments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progress/:courseId"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
        </Route>

        {/*
        =================================================
        ADMIN ROUTES

        Protected → Admin only
        ↓
        AdminLayout (sidebar)
        ↓
        Nested Admin Pages
        =================================================
        */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index               element={<AdminDashboard />} />
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="courses"      element={<CourseManagement />} />
          <Route path="enrollments"  element={<EnrollmentsAdmin />} />
        </Route>

        {/*
        =================================================
        404 ROUTE

        Must always be LAST.
        =================================================
        */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}

/*
=========================================================
ROUTING FLOW

Browser URL
↓
BrowserRouter
↓
App.jsx
↓
AppRoutes.jsx
↓
Find Matching Route
↓
Load Layout
↓
Load Page
↓
Render UI

=========================================================
*/
