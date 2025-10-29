const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Save/Update Progress
router.post('/', async (req, res) => {
  try {
    const { userId, userRole, lesson, completed, score } = req.body;
    let p = await Progress.findOne({ userId, lesson });
    if (!p) p = new Progress({ userId, userRole, lesson, completed, score });
    else {
      p.completed = completed;
      p.score = score;
      p.lastAccessed = Date.now();
    }
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get User Progress
router.get('/:userId', async (req, res) => {
  try {
    const list = await Progress.find({ userId: req.params.userId }).populate('lesson');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get Progress Statistics (NEW ENDPOINT)
router.get('/stats/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const allProgress = await Progress.find({ userId }).populate('lesson');
    const Lesson = require('../models/Lesson');
    const totalLessons = await Lesson.countDocuments();
    const completedLessons = allProgress.filter(p => p.completed).length;
    const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    const recentCompletions = allProgress
      .filter(p => p.completed)
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
      .slice(0, 5);
    
    const grade1Complete = allProgress.filter(p => p.completed && p.lesson?.grade === 1).length;
    const grade2Complete = allProgress.filter(p => p.completed && p.lesson?.grade === 2).length;
    const grade3Complete = allProgress.filter(p => p.completed && p.lesson?.grade === 3).length;
    
    res.json({
      totalLessons,
      completedLessons,
      completionPercentage,
      recentCompletions,
      gradeBreakdown: {
        grade1: grade1Complete,
        grade2: grade2Complete,
        grade3: grade3Complete
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;