const { User } = require('../sequelizeSetup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.updateUserInfo = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.userId; 

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      const userNotFoundResponse = {
        success: false,
        message: 'User not found',
      };
      return res.status(404).json(userNotFoundResponse);
    }

    // Update user's name and email
    user.name = name;
    user.email = email;
    await user.save();

    const updatedUserResponse = {
      success: true,
      message: 'User information updated successfully',
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json(updatedUserResponse);
  } catch (error) {
    console.error(error);

    const serverErrorResponse = {
      success: false,
      message: 'Server error',
    };

    res.status(500).json(serverErrorResponse);
  }
};

exports.getUserInfo = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming the user ID is passed as a parameter
  
      // Find the user by ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        const userNotFoundResponse = {
          success: false,
          message: 'User not found',
        };
        return res.status(404).json(userNotFoundResponse);
      }
  
      const userInfoResponse = {
        success: true,
        message: 'User information retrieved successfully',
        id: user.id,
        name: user.name,
        email: user.email,
        // Add any other properties you want to include in the response
      };
  
      res.json(userInfoResponse);
    } catch (error) {
      console.error(error);
  
      const serverErrorResponse = {
        success: false,
        message: 'Server error',
      };
  
      res.status(500).json(serverErrorResponse);
    }
};

module.exports = exports;
