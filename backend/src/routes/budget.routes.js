const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const budgetController = require('../controllers/budget.controller');

// Create new budget
router.post('/', verifyToken, budgetController.create);

// Get all budgets with progress
router.get('/', verifyToken, budgetController.getAll);

// Update budget
router.put('/:id', verifyToken, budgetController.update);

module.exports = router; 