const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const AppError = require('../utils/customError');

const enroll = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(new AppError('Invalid course ID format', 400));
    }
    
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return next(new AppError('Course not found', 404));
    }
    
    const existingEnrollment = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (existingEnrollment) {
      return next(new AppError('Duplicate enrollment', 400));
    }
    
    const newEnrollment = await Enrollment.create({ userId: req.user.id, courseId });
    
    res.status(201).json({ 
      message: 'Enrolled successfully', 
      enrollment: {
        userId: newEnrollment.userId.toString(),
        courseId: newEnrollment.courseId.toString(),
        date: newEnrollment.date,
        id: newEnrollment._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserEnrollments = async (req, res, next) => {
  try {
    const targetUserId = req.params.userId || req.user.id;
    
    if (req.user.role !== 'admin' && req.user.id !== targetUserId.toString()) {
      return next(new AppError('Forbidden: Can only view own enrollments', 403));
    }
    
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return next(new AppError('Invalid user ID format', 400));
    }
    
    const userEnrollments = await Enrollment.find({ userId: targetUserId });
    
    const mappedEnrollments = userEnrollments.map(e => ({
      userId: e.userId.toString(),
      courseId: e.courseId.toString(),
      date: e.date,
      id: e._id.toString()
    }));
    
    res.status(200).json(mappedEnrollments);
  } catch (error) {
    next(error);
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(new AppError('Invalid course ID format', 400));
    }
    
    const result = await Enrollment.findOneAndDelete({ userId: req.user.id, courseId });
    if (!result) {
      return next(new AppError('Enrollment not found', 404));
    }
    
    res.status(200).json({ message: 'Withdrawn successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { enroll, getUserEnrollments, withdraw };
