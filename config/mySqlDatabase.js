const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Set up Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.NAME,
  process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.DBPORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL
      rejectUnauthorized: false, // Disable certificate validation (use only for testing)
    },
  },
});


module.exports = sequelize;
