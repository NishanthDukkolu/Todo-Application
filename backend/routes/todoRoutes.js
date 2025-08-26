const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = new Todo({ ...req.body, user: req.user.id });
  await todo.save();
  res.status(201).json(todo);
});

router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

router.put('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;