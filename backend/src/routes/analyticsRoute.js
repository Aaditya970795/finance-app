const express = require('express');
const router = express.Router();

const { getTotalExpenses, getCategoryBreakdown, getMonthlyExpenses, getRecentTransactions } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');

/*
    @route   GET /api/analytics/total-expenses
    @desc    Get total expenses for the user
    @access  Private
*/
router.get('/total-expenses', authMiddleware, getTotalExpenses);

/*
    @route   GET /api/analytics/category-breakdown
    @desc    Get expense breakdown by category for the user
    @access  Private
*/
router.get('/category-breakdown', authMiddleware, getCategoryBreakdown);

/*
    @route   GET /api/analytics/monthly-expenses
    @desc    Get monthly expenses for the user
    @access  Private
*/
router.get('/monthly-expenses', authMiddleware, getMonthlyExpenses);

/*
    @route   GET /api/analytics/recent-transactions
    @desc    Get recent transactions for the user
    @access  Private
*/
router.get('/recent-transactions', authMiddleware, getRecentTransactions);

module.exports = router;