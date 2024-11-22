const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres.config');

const UserPreference = sequelize.define('UserPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'light',
    validate: {
      isIn: [['light', 'dark']]
    }
  },
  emailNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  pushNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  dashboardLayout: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
});

module.exports = UserPreference; 