const express = require('express');
const router = express.Router();

const { getDashboardSummary, getCategoryBreakdown, getMonthlyOverview, getBudgetVsExpenses } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

/*
    @route   GET /api/dashboard/summary
    @desc    Get dashboard summary for the user
    @access  Private
*/
router.get('/summary', authMiddleware, getDashboardSummary);

/*
    @route   GET /api/dashboard/category-breakdown
    @desc    Get expense breakdown by category for the user
    @access  Private
*/
router.get('/category-breakdown', authMiddleware, getCategoryBreakdown);

/*
    @route   GET /api/dashboard/monthly-overview
    @desc    Get monthly overview for the user
    @access  Private
*/
router.get('/monthly-overview', authMiddleware, getMonthlyOverview);

/*
    @route   GET /api/dashboard/budget-vs-expenses
    @desc    Get budget vs. expenses comparison for the user
    @access  Private
*/
router.get('/budget-vs-expenses', authMiddleware, getBudgetVsExpenses);

module.exports = router;