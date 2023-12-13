const { User } = require('../sequelizeSetup'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
console.log(User);
// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      const userResponse = {
        success: false,
        message: 'User with this email already exists',
      };
      
      return res.status(400).json(userResponse);
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a JWT token for the user
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ email, role }, secretKey, { expiresIn: '1h' });

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      token: token,
      tokenExpiry: Date.now() + 3600000, // Set token expiration time to 1 hour
    });

    const userResponse = {
      success: true,
      message: 'User registered successfully',
      id: newUser.id,
      token: newUser.token
    };

    res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);

    const serverErrorResponse = {
      success: false,
      message: 'Server error'
    };

    res.status(500).json(serverErrorResponse);
  }
};

// Log in an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const authResponse = {
        success: false,
        message: 'Authentication failed'
      };

      return res.status(401).json(authResponse);
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const authResponse = {
        success: false,
        message: 'Authentication failed'
      };

      return res.status(401).json(authResponse);
    }

    // Generate a new JWT token for the user
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

    // Update the user's token, tokenExpiry, and lastLogin fields in the database
    await User.update(
      {
        token: token,
        tokenExpiry: Date.now() + 3600000, // Set token expiration time to 1 hour
        lastLogin: new Date(),
      },
      { where: { id: user.id } }
    );

    const authResponse = {
      success: true,
      message: 'Authentication successful',
      id: user.id,
      token: user.token
    };

    res.json(authResponse);
  } catch (error) {
    console.error(error);

    const serverErrorResponse = {
      success: false,
      message: 'Server error'
    };

    res.status(500).json(serverErrorResponse);
  }
};

module.exports = exports;
