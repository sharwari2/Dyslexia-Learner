const mongoose = require('mongoose');
const ParentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  childIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});
module.exports = mongoose.model('Parent', ParentSchema);