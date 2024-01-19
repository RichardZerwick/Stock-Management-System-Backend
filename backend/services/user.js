const { User } = require('../sequelizeSetup');

class UserService {
  async updateUserInfo(userId, { name, email }) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      user.name = name;
      user.email = email;
      await user.save();

      return {
        success: true,
        message: 'User information updated successfully',
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }

  async getUserInfo(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      return {
        success: true,
        message: 'User information retrieved successfully',
        id: user.id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin,
        password: user.password,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }
}

module.exports = new UserService();
