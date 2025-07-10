const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


const adminAuth = require('../middleware/adminAuth');

// API: Foydalanuvchilar ro'yxati (JSON) [admin only]
router.get("/api/users", adminAuth, usersController.getUsersApi);

// View: Foydalanuvchilar ro'yxati sahifasi [admin only]
router.get("/users", adminAuth, usersController.getUsersView);

// Admin qilib tayinlash (POST) [admin only]
router.post("/users/:id/make-admin", adminAuth, usersController.makeAdmin);

module.exports = router;
