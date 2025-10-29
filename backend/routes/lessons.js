const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create Lesson
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const { title, grade, challenge, textContent, subject, unit } = req.body;
    const audioUrl = req.file ? `/uploads/${req.file.filename}` : req.body.audioUrl || '';
    const lesson = new Lesson({
      title,
      grade,
      challenge: challenge || 'dyslexia',
      textContent,
      audioUrl,
      subject: subject || 'English',
      unit: unit || 0
    });
    await lesson.save();
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get Lessons with Filters
router.get('/', async (req, res) => {
  try {
    const { challenge = 'dyslexia', grade, subject } = req.query;
    const q = { challenge };
    if (grade) q.grade = Number(grade);
    if (subject && subject !== 'all') q.subject = subject;
    const lessons = await Lesson.find(q).sort({ grade: 1, unit: 1, createdAt: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete Lesson (NEW ENDPOINT)
router.delete('/:id', async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;