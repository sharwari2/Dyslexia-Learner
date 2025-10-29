const mongoose = require('mongoose');
const ProgressSchema = new mongoose.Schema({
  userId: String,
  userRole: String,
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Progress', ProgressSchema);