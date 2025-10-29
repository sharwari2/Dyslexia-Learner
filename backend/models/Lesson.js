const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  textContent: { type: String, required: true },
  grade: { type: Number, required: true },
  subject: { type: String, default: 'English' },
  audioUrl: String,
  unit: { type: Number, default: 0 },           // ← ADD THIS
  challenge: { type: String, default: 'dyslexia' }, // ← ADD THIS
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);