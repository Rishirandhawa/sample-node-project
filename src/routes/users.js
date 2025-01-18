const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  
  users.push(user);
  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;