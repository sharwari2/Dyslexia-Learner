const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

function modelForRole(role){
  if(role === 'parent') return Parent;
  if(role === 'student') return Student;
  if(role === 'teacher') return Teacher;
  return null;
}

router.post('/register', async (req,res)=>{
  try{
    const { name, email, password, role } = req.body;
    const Model = modelForRole(role);
    if(!Model) return res.status(400).json({ msg: 'Invalid role' });
    let user = await Model.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User exists' });
    user = new Model({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || 'devsecret');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role } });
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password, role } = req.body;
    const Model = modelForRole(role);
    if(!Model) return res.status(400).json({ msg: 'Invalid role' });
    const user = await Model.findOne({ email });
    if(!user || user.password !== password) return res.status(400).json({ msg: 'Invalid creds' });
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || 'devsecret');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role } });
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;