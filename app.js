const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Apply user routes
app.use('/users', userRoutes);

// Sync database and start the server
(async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1); // Exit the process with a failure code
  }
})();
