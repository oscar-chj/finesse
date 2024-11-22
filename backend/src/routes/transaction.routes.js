const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

// Create new transaction
router.post('/', verifyToken, transactionController.create);

// Get all transactions
router.get('/', verifyToken, transactionController.getAll);

// Delete transaction
router.delete('/:id', verifyToken, transactionController.delete);

module.exports = router; 