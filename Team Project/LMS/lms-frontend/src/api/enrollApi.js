// src/api/enrollApi.js

/*
=========================================================
ENROLLMENT API LAYER

Endpoints mapped to backend:

POST   /enroll/:courseId           – enroll in a course
DELETE /enroll/:courseId           – withdraw from a course
GET    /users/enrollments          – get current user's enrollments
GET    /users/:userId/enrollments  – get specific user's enrollments (admin)

All routes require authentication.

=========================================================
*/

import api from "./axios";

/*
=========================================================
ENROLL IN COURSE
=========================================================
*/

export const enrollCourse = async (courseId) => {
  try {
    const response = await api.post(`/enroll/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to enroll");
  }
};

/*
=========================================================
WITHDRAW FROM COURSE
=========================================================
*/

export const withdrawCourse = async (courseId) => {
  try {
    const response = await api.delete(`/enroll/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to withdraw");
  }
};

/*
=========================================================
GET MY ENROLLMENTS
=========================================================
*/

export const getMyEnrollments = async () => {
  try {
    const response = await api.get("/users/enrollments");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch enrollments");
  }
};

/*
=========================================================
GET USER ENROLLMENTS (admin)
=========================================================
*/

export const getUserEnrollments = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/enrollments`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user enrollments");
  }
};
