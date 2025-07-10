const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  activationToken: { type: String },
  activationTokenExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
