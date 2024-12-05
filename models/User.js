const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/mySqlDatabase');

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the value is not empty
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,   // Ensures the value is a valid email address
      notEmpty: true,  // Ensures the value is not empty
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,  // Ensures the value is not empty
    }
  }
});

module.exports = User;
