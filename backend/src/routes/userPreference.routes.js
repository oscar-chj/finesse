const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const userPreferenceController = require('../controllers/userPreference.controller');

// Get user preferences
router.get('/', verifyToken, userPreferenceController.getUserPreferences);

// Update user preferences
router.put('/', verifyToken, userPreferenceController.updatePreferences);

module.exports = router; 