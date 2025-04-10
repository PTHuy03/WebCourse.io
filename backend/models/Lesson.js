const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String },
  videoUrl:  { type: String },
  order:     { type: Number, default: 0 },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  chapter:   { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);