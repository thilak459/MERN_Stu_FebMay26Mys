const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/authMiddleware');
const User = require('../models/User');
const AppError = require('../utils/customError');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new AppError('Missing username or password', 400));
    }
    
    // Find user in database
    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }
    
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }
    
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, {
      httpOnly: true,
    });
    
    if (req.session) {
      req.session.userId = user.id;
      req.session.role = user.role;
    }
    
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };