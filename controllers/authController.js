exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out', data: null });
};
const authService = require('../services/authService');
const validationService = require('../services/validationService');

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const validationError = validationService.validateRegister({ email, password });
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError, data: null });
  }
  try {
    await authService.registerUser(email, password);
    res.status(201).json({ success: true, message: 'Registered! Please check your email to activate your account.', data: null });
  } catch (err) {
    next(err);
  }
};

exports.activate = async (req, res, next) => {
  try {
    const { token } = req.params;
    await authService.activateUser(token);
    res.json({ success: true, message: 'Account activated! You can now login.', data: null });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const validationError = validationService.validateLogin({ email, password });
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError, data: null });
  }
  try {
    const token = await authService.loginUser(email, password);
    // Tokenni cookie ga ham yozamiz (httpOnly, secure prod-da)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ success: true, message: 'Login successful', data: { token } });
  } catch (err) {
    next(err);
  }
};
