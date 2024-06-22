const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "A course must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      100,
      "A course name must have less or equal then 100 characters",
    ],
  },
  courseDescription: {
    type: String,
    required: [true, "A course must have a description"],
    trim: true,
    maxlength: [
      5000,
      "A course description must have less or equal then 5000 characters",
    ],
  },
  coursePrice: {
    type: Number,
    required: [true, "A course must have a price"],
  },
  courseDuration: {
    type: Number,
    required: [true, "A course must have a duration"],
  },
  courseImage: {
    type: String,
    required: [true, "A course must have a image"],
  },
});
