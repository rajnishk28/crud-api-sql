const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/mySqlDatabase');
const userRoutes = require('./routes/userRoutes');
const mongoDatabase = require("./config/mongoDatabase")
const fileUploadRoutes =require("./routes/file.routes")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Apply user routes
app.use('/users', userRoutes);
app.use("/file", fileUploadRoutes);

// Sync database and start the server
(async () => {
  try {
    // Test MySQL database connection
    await sequelize.authenticate();
    console.log("MySQL Database connection has been established successfully.");
    sequelize.sync({ force: false });
    // MongoDB connection is already initialized in `mongoDatabase`
    await mongoDatabase; // Ensure MongoDB connection resolves successfully

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1); // Exit the process with a failure code
  }
})();

