// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Apply user routes
app.use('/users', userRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and synced.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
