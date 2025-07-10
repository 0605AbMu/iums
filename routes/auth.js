const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Register
router.post('/register', authController.register);
// Activate
router.get('/activate/:token', authController.activate);
// Login
router.post('/login', authController.login);
// Logout
router.post('/logout', authController.logout);

module.exports = router;
