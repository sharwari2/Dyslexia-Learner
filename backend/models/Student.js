const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  grade: { type: Number, default: 1 }
});
module.exports = mongoose.model('Student', StudentSchema);