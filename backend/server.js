const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded audio files publicly (from backend/uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve static audio files from frontend/public/audio
app.use('/audio', express.static(path.join(__dirname, '../frontend/public/audio')));

// Routes
const lessonRoutes = require('./routes/lessons');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dyslexiaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
