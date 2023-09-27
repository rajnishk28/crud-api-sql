// models/User.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;

