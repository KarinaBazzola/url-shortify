// backend/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
