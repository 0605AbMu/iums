// Global error handler middleware
module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // Custom error types
  if (err.status) {
    return res.status(err.status).json({ success: false, message: err.message, data: null });
  }
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message, data: null });
  }
  // Default: 500
  res.status(500).json({ success: false, message: 'Server error', data: null, error: err.message });
};
