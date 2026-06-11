const express = require('express');

const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile } = require('../controllers/authController');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

/*
    * @route   POST /api/auth/register
    * @desc    Register a new user
    * @access  Public
*/
router.post('/register', validateRegister, validateMiddleware, registerUser);

/*
    * @route   POST /api/auth/login
    * @desc    Login user and return JWT token
    * @access  Public
*/
router.post('/login', validateLogin, validateMiddleware, loginUser);

/*
    * @route   POST /api/auth/logout
    * @desc    Logout user
    * @access  Public
*/
router.post('/logout', logoutUser);

/*
    * @route   GET /api/auth/profile
    * @desc    Get user profile
    * @access  Private
*/
router.get('/profile', authMiddleware, getProfile);

module.exports = router;