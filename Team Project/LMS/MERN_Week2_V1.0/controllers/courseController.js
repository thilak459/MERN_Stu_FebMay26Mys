const mongoose = require('mongoose');
const Course = require('../models/Course');
const AppError = require('../utils/customError');

const getAllCourses = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category.toLowerCase();
    }
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty.toLowerCase();
    }
    const courses = await Course.find(filter);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const validateCourseId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid course ID format', 400));
  }
  req.courseId = id;
  next();
};

const getCourseDetails = async (req, res, next) => {
  try {
    const course = await Course.findById(req.courseId);
    if (!course) {
      return next(new AppError('Course not found', 404));
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, category, difficulty, description } = req.body;
    if (!title || !category || !difficulty) {
      return next(new AppError('Missing required fields in request body', 400));
    }
    const newCourse = await Course.create({
      title,
      category: category.toLowerCase(),
      difficulty: difficulty.toLowerCase(),
      description
    });
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.courseId, req.body, { new: true, runValidators: true });
    if (!course) {
      return next(new AppError('Course not found', 404));
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.courseId);
    if (!course) {
      return next(new AppError('Course not found', 404));
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCourses, validateCourseId, getCourseDetails, createCourse, updateCourse, deleteCourse };