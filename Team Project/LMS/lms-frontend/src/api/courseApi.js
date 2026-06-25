// src/api/courseApi.js

/*
=========================================================
COURSE API LAYER

Endpoints mapped to backend:

GET    /courses               – getAllCourses (with ?category & ?difficulty filters)
GET    /courses/:id           – getCourseDetails
POST   /courses               – createCourse  (admin only)
PUT    /courses/:id           – updateCourse  (admin only)
DELETE /courses/:id           – deleteCourse  (admin only)

=========================================================
*/

import api from "./axios";

/*
=========================================================
GET ALL COURSES

Query params supported:
  - category    (e.g. "web", "programming")
  - difficulty  (e.g. "beginner", "intermediate", "advanced")

=========================================================
*/

export const getAllCourses = async (params = {}) => {
  try {
    const response = await api.get("/courses", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

/*
=========================================================
GET COURSE DETAILS
=========================================================
*/

export const getCourseDetails = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Course not found");
  }
};

/*
=========================================================
CREATE COURSE (admin only)
=========================================================
*/

export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses", courseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

/*
=========================================================
UPDATE COURSE (admin only)
=========================================================
*/

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

/*
=========================================================
DELETE COURSE (admin only)
=========================================================
*/

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};
