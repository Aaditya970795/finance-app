const express = require('express');

const router = express.Router();

const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');

/*
    * @route   POST /api/auth/register
    * @desc    Register a new user
    * @access  Public
*/
router.post('/register', validateRegister, registerUser);

/*
    * @route   POST /api/auth/login
    * @desc    Login user and return JWT token
    * @access  Public
*/
router.post('/login', validateLogin, loginUser);

/*
    * @route   POST /api/auth/logout
    * @desc    Logout user
    * @access  Public
*/
router.post('/logout', logoutUser);

module.exports = router;