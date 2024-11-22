const { Budget, Transaction } = require('../models');
const { Op } = require('sequelize');

const budgetController = {
  // Create new budget
  async create(req, res) {
    try {
      const { category, amount, period, startDate, endDate } = req.body;
      const budget = await Budget.create({
        userId: req.user.uid,
        category,
        amount,
        period,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });
      res.status(201).json(budget);
    } catch (error) {
      console.error('Create Budget Error:', error);
      res.status(500).json({ message: 'Error creating budget' });
    }
  },

  // Get all budgets with spending progress
  async getAll(req, res) {
    try {
      const budgets = await Budget.findAll({
        where: { userId: req.user.uid }
      });

      // Calculate spending for each budget
      const budgetsWithProgress = await Promise.all(
        budgets.map(async (budget) => {
          const spending = await Transaction.sum('amount', {
            where: {
              userId: req.user.uid,
              category: budget.category,
              type: 'expense',
              date: {
                [Op.between]: [budget.startDate, budget.endDate]
              }
            }
          });

          return {
            ...budget.toJSON(),
            spent: spending || 0,
            remaining: budget.amount - (spending || 0)
          };
        })
      );

      res.json(budgetsWithProgress);
    } catch (error) {
      console.error('Get Budgets Error:', error);
      res.status(500).json({ message: 'Error fetching budgets' });
    }
  },

  // Update budget
  async update(req, res) {
    try {
      const { id } = req.params;
      const { amount, period, startDate, endDate } = req.body;
      
      const [updated] = await Budget.update(
        { amount, period, startDate, endDate },
        { where: { id, userId: req.user.uid } }
      );

      if (!updated) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      const budget = await Budget.findByPk(id);
      res.json(budget);
    } catch (error) {
      console.error('Update Budget Error:', error);
      res.status(500).json({ message: 'Error updating budget' });
    }
  }
};

module.exports = budgetController; 