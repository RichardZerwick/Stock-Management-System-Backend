const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+02:00', // set your timezone here
  }
);

// Define your models
const User = require('./models/user')(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
};
