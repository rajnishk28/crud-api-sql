const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/mySqlDatabase');
const userRoutes = require('./routes/userRoutes');
const mongoDatabase = require("./config/mongoDatabase")
const fileUploadRoutes =require("./routes/file.routes")
const morgan =require("morgan");
const {logger} =require("./utils/logger")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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

