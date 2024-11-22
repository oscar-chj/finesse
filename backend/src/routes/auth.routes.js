const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { verifyToken } = require('../middleware/auth.middleware');

// Register user after Firebase authentication
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const { uid } = req.user;

    const user = await User.create({
      id: uid,
      name,
      email,
      password: 'firebase-auth' // Since we're using Firebase Auth
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router; 