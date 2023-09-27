// models/User.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
