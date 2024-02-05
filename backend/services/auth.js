const { User } = require('../sequelizeSetup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async registerUser({ name, email, password, role }) {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return { success: false, message: 'User with this email already exists' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ email, role }, secretKey, { expiresIn: '24h' });

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        token: token,
        tokenExpiry: Date.now() + 86400000,
      });

      return {
        success: true,
        message: 'User registered successfully',
        id: newUser.id,
        token: newUser.token,
        tokenExpiry: newUser.tokenExpiry,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error: ' + error };
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { success: false, message: 'Authentication failed' };
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { success: false, message: 'Authentication failed' };
      }

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '24h' });

      await User.update(
        {
          token: token,
          tokenExpiry: Date.now() + 86400000,
          lastLogin: new Date(),
        },
        { where: { id: user.id } }
      );

      return {
        success: true,
        message: 'Authentication successful',
        id: user.id,
        token: user.token,
        role: user.role,
        tokenExpiry: user.tokenExpiry,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }
}

module.exports = new AuthService();
