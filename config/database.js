const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql', // or any other supported dialect
});

module.exports = sequelize;
