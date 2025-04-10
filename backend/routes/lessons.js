const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('course');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new lesson and add to course
router.post('/', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();

    // Add lesson to course's lessons array
    if (lesson.course) {
      await Course.findByIdAndUpdate(lesson.course, { $push: { lessons: lesson._id } });
    }

    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a lesson
router.put('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a lesson
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    // Remove lesson from course's lessons array
    if (lesson.course) {
      await Course.findByIdAndUpdate(lesson.course, { $pull: { lessons: lesson._id } });
    }

    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;