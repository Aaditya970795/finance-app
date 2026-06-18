const express = require("express");
const router = express.Router();

const {
  getMonthlyTrend,
  getIncomeExpenseTrend
} = require("../controllers/analyticsController");

const authMiddleware = require("../middlewares/authMiddleware");

/*
    @route   GET /api/analytics/monthly-trend
    @desc    Get monthly expense trend for the last 12 months
    @access  Private
*/
router.get(
  "/monthly-trend",
  authMiddleware,
  getMonthlyTrend
);

/*
    @route   GET /api/analytics/income-expense-trend
    @desc    Get income vs. expense trend for the last 12 months
    @access  Private
*/
router.get(
  "/income-expense-trend",
  authMiddleware,
  getIncomeExpenseTrend
);

module.exports = router;