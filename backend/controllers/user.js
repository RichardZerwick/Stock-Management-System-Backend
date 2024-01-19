const userService = require('../services/user');

exports.updateUserInfo = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.userId;
  const result = await userService.updateUserInfo(userId, { name, email });
  return res.status(result.success ? 200 : 404).json(result);
};

exports.getUserInfo = async (req, res) => {
  const userId = req.params.userId;
  const result = await userService.getUserInfo(userId);
  return res.status(result.success ? 200 : 404).json(result);
};
