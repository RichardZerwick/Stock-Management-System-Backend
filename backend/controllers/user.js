const userService = require('../services/user');
const jwt = require('jsonwebtoken');
const { getUserIdFromToken } = require('../utils/authUtils');


exports.updateUserInfo = async (req, res) => {
  const { name, email } = req.body;
  const token = req.headers.authorization; // Get token from request headers
  const userId = getUserIdFromToken(token); // Extract userId from token
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing or invalid' });
  }
  const result = await userService.updateUserInfo(userId, { name, email });
  return res.status(result.success ? 200 : 404).json(result);
};

exports.getUserInfo = async (req, res) => {
  const token = req.headers.authorization; // Get token from request headers
  const userId = getUserIdFromToken(token); // Extract userId from token
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing or invalid' });
  }
  const result = await userService.getUserInfo(userId);
  return res.status(result.success ? 200 : 404).json(result);
};
