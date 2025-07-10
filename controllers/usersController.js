const User = require('../models/User');

exports.getUsersApi = async (req, res, next) => {
  try {
    const users = await User.find({}, 'email isActive createdAt').lean();
    res.json({ success: true, message: 'User list', data: users });
  } catch (err) {
    next(err);
  }
};

exports.getUsersView = async (req, res, next) => {
  try {
    const users = await User.find({}, 'email isActive isAdmin createdAt').lean();
    res.render('users', { users, currentUser: req.user });
  } catch (err) {
    next(err);
  }
};

exports.makeAdmin = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found', data: null });
    res.redirect('/users');
  } catch (err) {
    next(err);
  }
};
