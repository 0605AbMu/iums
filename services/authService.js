
const emailService = require('./emailService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const ACTIVATION_TOKEN_EXPIRES_MS = 1000 * 60 * 60; // 1 hour

async function registerUser(email, password) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');
  const hash = await bcrypt.hash(password, 10);
  const activationToken = crypto.randomBytes(32).toString('hex');
  const activationTokenExpires = Date.now() + ACTIVATION_TOKEN_EXPIRES_MS;
  // Eng birinchi user admin bo'ladi
  const userCount = await User.countDocuments();
  const isAdmin = userCount === 0;
  const user = await User.create({
    email,
    password: hash,
    activationToken,
    activationTokenExpires,
    isAdmin
  });
  await emailService.sendActivationEmail(email, activationToken);
  return user;
}

async function activateUser(token) {
  const user = await User.findOne({ activationToken: token, activationTokenExpires: { $gt: Date.now() } });
  if (!user) throw new Error('Invalid or expired activation link');
  user.isActive = true;
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;
  await user.save();
  return user;
}

async function loginUser(email, password) {
  // Validation is handled in controller
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  if (!user.isActive) throw new Error('Account not activated');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });
  return token;
}



module.exports = {
  registerUser,
  activateUser,
  loginUser
};
