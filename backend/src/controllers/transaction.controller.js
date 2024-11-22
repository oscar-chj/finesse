const { Transaction } = require('../models');
const { Op } = require('sequelize');

const transactionController = {
  // Create new transaction
  async create(req, res) {
    try {
      const { amount, type, category, description, date } = req.body;
      const transaction = await Transaction.create({
        userId: req.user.uid,
        amount,
        type,
        category,
        description,
        date: date || new Date()
      });
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Create Transaction Error:', error);
      res.status(500).json({ message: 'Error creating transaction' });
    }
  },

  // Get all transactions for a user
  async getAll(req, res) {
    try {
      const { startDate, endDate, type, category } = req.query;
      const where = { userId: req.user.uid };
      
      if (startDate && endDate) {
        where.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      if (type) where.type = type;
      if (category) where.category = category;

      const transactions = await Transaction.findAll({ where });
      res.json(transactions);
    } catch (error) {
      console.error('Get Transactions Error:', error);
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  },

  // Delete a transaction
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Transaction.destroy({
        where: { id, userId: req.user.uid }
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Delete Transaction Error:', error);
      res.status(500).json({ message: 'Error deleting transaction' });
    }
  }
};

module.exports = transactionController; 