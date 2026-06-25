// src/api/progressApi.js

/*
=========================================================
PROGRESS API LAYER

Endpoints mapped to backend:

POST /progress/:courseId/lesson  – markLessonComplete
GET  /progress/:courseId         – getProgress

All routes require authentication.

=========================================================
*/

import api from "./axios";

/*
=========================================================
MARK LESSON COMPLETE

Body: { lessonId: <number> }

=========================================================
*/

export const markLessonComplete = async (courseId, lessonId) => {
  try {
    const response = await api.post(`/progress/${courseId}/lesson`, { lessonId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to mark lesson");
  }
};

/*
=========================================================
GET PROGRESS FOR A COURSE
=========================================================
*/

export const getCourseProgress = async (courseId) => {
  try {
    const response = await api.get(`/progress/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch progress");
  }
};
