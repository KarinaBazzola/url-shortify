// backend/server.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const linkRoutes = require('./routes/linkRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/links', linkRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
};

startServer();
