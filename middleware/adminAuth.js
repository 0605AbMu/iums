
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const checkRole = require('./roleCheck');

module.exports = async function (req, res, next) {
  try {
    let token = null;
    // 1. Header: Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Cookie: token=<token> yoki token=Bearer <token>
    else if (req.cookies && req.cookies.token) {
      if (req.cookies.token.startsWith('Bearer ')) {
        token = req.cookies.token.split(' ')[1];
      } else {
        token = req.cookies.token;
      }
    }
    if (!token) return res.status(401).json({ success: false, message: 'Token required', data: null });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return res.status(403).json({ success: false, message: 'Access denied', data: null });
    if (!checkRole(user, 'admin')) return res.status(403).json({ success: false, message: 'Admin access required', data: null });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token', data: null });
  }
};
