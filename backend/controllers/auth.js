const authService = require('../services/auth');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await authService.registerUser({ name, email, password, role });
  return res.status(result.success ? 201 : 400).json(result);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });
  return res.status(result.success ? 200 : 401).json(result);
};
