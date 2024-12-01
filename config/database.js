const { Sequelize } = require('sequelize');

// Set up Sequelize instance
const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_ZnaCBt_ua2ytUC0bkAX', {
  host: 'social-app-mysql-db-do-user-14581081-0.i.db.ondigitalocean.com',
  port: 25060,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL
      rejectUnauthorized: false, // Disable certificate validation (use only for testing)
    },
  },
});


module.exports = sequelize;
