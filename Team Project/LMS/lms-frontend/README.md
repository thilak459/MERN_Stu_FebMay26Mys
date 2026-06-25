# LMS Frontend

A React + Vite frontend for the **LMS (Learning Management System)** backend (`MERN_Week2_V1.0`).

Built following the same architecture as the **W12 BookMyShow Frontend**.

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | ^18.3 |
| Vite | ^8.0 |
| React Router | v7 |
| Redux Toolkit | ^2.12 |
| Axios | ^1.17 |

---

## Project Structure

```
lms-frontend/
├── src/
│   ├── api/              # API layer (axios instance + service functions)
│   │   ├── axios.js      # Axios instance with JWT interceptor
│   │   ├── authApi.js    # POST /auth/login
│   │   ├── courseApi.js  # GET/POST/PUT/DELETE /courses
│   │   ├── enrollApi.js  # POST/DELETE /enroll/:id, GET /users/enrollments
│   │   └── progressApi.js# GET/POST /progress/:courseId
│   │
│   ├── context/
│   │   └── AuthContext.jsx  # JWT auth context + useAuth hook
│   │
│   ├── hooks/
│   │   └── useAuth.js       # Re-export of useAuth
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── courses/
│   │       └── coursesSlice.js  # fetchCourses async thunk
│   │
│   ├── components/
│   │   ├── Navbar.jsx           # Auth-aware navbar
│   │   ├── LoadingSpinner.jsx   # Reusable spinner
│   │   ├── CourseCard.jsx       # Course display card
│   │   ├── EnrollmentCard.jsx   # Enrolled course card
│   │   └── ProtectedRoute.jsx   # Auth + role guard
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx  # Navbar + Outlet
│   │   └── AdminLayout.jsx   # Sidebar + Outlet
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with hero
│   │   ├── Courses.jsx        # Course listing + filters
│   │   ├── CourseDetails.jsx  # Single course + enroll/withdraw
│   │   ├── MyEnrollments.jsx  # Student's enrolled courses
│   │   ├── Progress.jsx       # Lesson progress tracker
│   │   ├── Login.jsx          # Login form
│   │   ├── NotFound.jsx       # 404 page
│   │   └── admin/
│   │       ├── Dashboard.jsx          # Stats + course table
│   │       ├── CourseManagement.jsx   # Full CRUD for courses
│   │       └── EnrollmentsAdmin.jsx   # View user enrollments
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx    # React Router v7 route definitions
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Design system + global styles
│
├── .env                     # VITE_API_BASE_URL=http://localhost:3000
├── index.html
├── vite.config.js
└── package.json
```

---

## Backend API Mapping

| Frontend Page | Backend Endpoint |
|---------------|-----------------|
| Login | `POST /auth/login` |
| Courses | `GET /courses?category=&difficulty=` |
| CourseDetails | `GET /courses/:id` |
| CourseDetails → Enroll | `POST /enroll/:courseId` |
| CourseDetails → Withdraw | `DELETE /enroll/:courseId` |
| MyEnrollments | `GET /users/enrollments` |
| Progress | `GET /progress/:courseId` |
| Progress → Mark Complete | `POST /progress/:courseId/lesson` |
| Admin → Create Course | `POST /courses` |
| Admin → Update Course | `PUT /courses/:id` |
| Admin → Delete Course | `DELETE /courses/:id` |
| Admin → User Enrollments | `GET /users/:userId/enrollments` |

---

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | `student1` | `password123` |
| Admin | `admin1` | `adminpassword` |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start backend (MERN_Week2_V1.0) on port 3000

# 3. Start frontend dev server
npm run dev
```

Open http://localhost:5173

---

## Architecture Mirror

This frontend mirrors the W12 **BookMyShow Frontend** architecture:

| BookMyShow | LMS Equivalent |
|-----------|----------------|
| Movies page | Courses page |
| MovieCard | CourseCard |
| Bookings page | MyEnrollments page |
| MyBookings | Progress page |
| BookingCard | EnrollmentCard |
| Admin Dashboard | Admin Dashboard |
| MovieManagement | CourseManagement |
| ShowManagement | EnrollmentsAdmin |
| moviesSlice | coursesSlice |
