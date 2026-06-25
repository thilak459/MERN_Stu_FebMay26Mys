const mongoose = require('mongoose');
const Progress = require('../models/Progress');
const Enrollment = require('../models/Enrollment');
const AppError = require('../utils/customError');

const markLessonComplete = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { lessonId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(courseId) || typeof lessonId !== 'number') {
      return next(new AppError('Invalid course ID or lesson ID', 400));
    }
    
    const isEnrolled = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (!isEnrolled) {
      return next(new AppError('Completing lesson without enrollment', 400));
    }
    
    let userProgress = await Progress.findOne({ userId: req.user.id, courseId });
    if (!userProgress) {
      userProgress = await Progress.create({ userId: req.user.id, courseId, completedLessons: [] });
    }
    
    if (userProgress.completedLessons.includes(lessonId)) {
      return next(new AppError('Completing same lesson twice', 400));
    }
    
    userProgress.completedLessons.push(lessonId);
    await userProgress.save();
    
    res.status(200).json({ 
      message: 'Lesson marked as complete', 
      progress: {
        userId: userProgress.userId.toString(),
        courseId: userProgress.courseId.toString(),
        completedLessons: userProgress.completedLessons,
        id: userProgress._id.toString()
      } 
    });
  } catch (error) {
    next(error);
  }
};

const getProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
       return next(new AppError('Invalid course ID format', 400));
    }
    
    let userProgress = await Progress.findOne({ userId: req.user.id, courseId });
    if (!userProgress) {
      return res.status(200).json({ 
        userId: req.user.id.toString(), 
        courseId, 
        completedLessons: [] 
      });
    }
    
    res.status(200).json({
      userId: userProgress.userId.toString(),
      courseId: userProgress.courseId.toString(),
      completedLessons: userProgress.completedLessons,
      id: userProgress._id.toString()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { markLessonComplete, getProgress };