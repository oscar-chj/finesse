// PostgreSQL Models
const User = require('./postgres/User');
const Transaction = require('./postgres/Transaction');
const Budget = require('./postgres/Budget');
const UserPreference = require('./postgres/UserPreference');

// Set up associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

User.hasOne(UserPreference);
UserPreference.belongsTo(User);

module.exports = {
  User,
  Transaction,
  Budget,
  UserPreference
}; 