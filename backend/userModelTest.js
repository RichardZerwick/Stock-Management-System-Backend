// Import Sequelize and initialize the database connection
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Import the User model
const User = require('./models/user')(sequelize, Sequelize);

// Function to test Sequelize operations
const testSequelizeOperations = async () => {
  try {
    // Test findOne operation
    const foundUser = await User.findOne({ where: { email : 'Jack@gmail.com' } });
    console.log('Found User:', foundUser ? foundUser.toJSON() : 'User not found');

    // Add more Sequelize operations here for testing (create, update, delete, etc.)
  } catch (error) {
    console.error('Error during Sequelize operations:', error);
  } finally {
    // Close the database connection after testing
    await sequelize.close();
  }
};

// Run the test function
testSequelizeOperations();
