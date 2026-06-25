// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
    },
    category: {
      type:     String,
      required: [true, 'Category is required'],
      enum:     ['web', 'programming', 'data', 'design'],
      lowercase: true,
    },
    difficulty: {
      type:     String,
      required: [true, 'Difficulty is required'],
      enum:     ['beginner', 'intermediate', 'advanced'],
      lowercase: true,
    },
    description: {
      type:    String,
      default: '',
      trim:    true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Course', courseSchema);
