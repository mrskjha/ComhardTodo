const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// API: POST /api/auth/signup
router.post('/signup', signup);

// API: POST /api/auth/login
router.post('/login', login);

module.exports = router;