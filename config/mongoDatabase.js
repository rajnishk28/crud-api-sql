const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const mongoDatabase = mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoDatabase;
