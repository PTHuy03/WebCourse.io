const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  image:       { type: String },
  category:    { type: String },
  price:       { type: Number, default: 0 },
  lessons:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);