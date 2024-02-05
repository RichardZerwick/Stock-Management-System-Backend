const jwt = require('jsonwebtoken');

function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    return null;
  }
}

module.exports = { getUserIdFromToken };
