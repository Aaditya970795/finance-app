const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/temp');


const registerUser = async (req, res, next) => {
    try {
        console.log('Registering user with data:', req.body);
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new AppError('User with this email already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword });

        await user.save();
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({ success: true, message: 'User registered successfully',
                user: { id: user._id, username: user.username, email: user.email }
         });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ success: true, message: 'Login successful', token: jwtToken, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Logout successful' });
};

const getProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({ 
            success: true,
            user 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, logoutUser, getProfile };