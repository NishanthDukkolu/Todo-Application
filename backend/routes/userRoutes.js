const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { user_fname, user_lname, user_id, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ user_fname, user_lname, user_id, email, password: hashed });
  await user.save();
  res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;