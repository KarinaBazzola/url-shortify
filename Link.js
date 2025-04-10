// backend/models/Link.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Link = sequelize.define('Link', {
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Link;
