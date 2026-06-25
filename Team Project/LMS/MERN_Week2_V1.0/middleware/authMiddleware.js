const jwt = require('jsonwebtoken');
const AppError = require('../utils/customError');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'lms_super_secret_jwt_key_2024';

const authMiddleware = async (req, res, next) => {
  let token;
  
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Missing JWT', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return next(new AppError('Invalid token: User not found', 401));
    }
    
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};

module.exports = { authMiddleware, JWT_SECRET };
