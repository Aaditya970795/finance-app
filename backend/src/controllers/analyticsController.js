const mongoose = require("mongoose");
const transactionModel = require("../models/transactionModel");

const getStartDateFromRange = require("../utils/getStartDateFromRange");
const validateRange = require("../utils/validateRange");

const calculateSavings = require("../utils/analytics/calculateSavings");
const getTopCategory = require("../utils/analytics/getTopCategory");
const getExpenseTrend = require("../utils/analytics/getExpenseTrend");
const { getBudgetAlert } = require("../utils/analytics/getBudgetAlert");


const getMonthlyTrend = async (req, res, next) => {
  try {
    const userId = req.userId;

    const range = req.query.range || "12m";

    if(!validateRange(range)) {
      return res.status(400).json({
        success: false,
        message: "Invalid range. Allowed values: 3m, 6m, 12m, and all.",
      });
    }

    const startDate = getStartDateFromRange(range);

    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
      type: "expense",
    };

    if (startDate) {
      matchStage.date = { $gte: startDate };
    }

    const monthlyTrend = await transactionModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$date",
            },
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          total: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: monthlyTrend,
    });
  } catch (error) {
    next(error);
  }
};

const getIncomeExpenseTrend = async (req, res, next) => {
  try {
    const userId = req.userId;

    const range = req.query.range || "12m";

    if(!validateRange(range)) {
      return res.status(400).json({
        success: false,
        message: "Invalid range. Allowed values: 3m, 6m, 12m, and all.",
      });
    }

    const startDate = getStartDateFromRange(range);

    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
    };

    if (startDate) {
      matchStage.date = { $gte: startDate };
    }

    const incomeExpenseTrend = await transactionModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
            _id: {
            $dateToString: {
                format: "%Y-%m",
                date: "$date",
            },
            },

            income: {
            $sum: {
                $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
                ],
            },
            },

            expense: {
            $sum: {
                $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
                ],
            },
            },
        },
        },
        {
        $sort: {
            _id: 1,
        },
        },
        {
        $project: {
            _id: 0,
            month: "$_id",
            income: 1,
            expense: 1,
        },
        },
    ]);    

    res.status(200).json({
      success: true,
      data: incomeExpenseTrend,
    });
  } catch (error) {
    next(error);
  }
};

const getFilteredCategoryBreakdown = async (req, res, next) => {
  try {
    const userId = req.userId;

    const range = req.query.range || "12m";

    if(!validateRange(range)) {
      return res.status(400).json({
        success: false,
        message: "Invalid range. Allowed values: 3m, 6m, 12m, and all.",
      });
    }

    const startDate = getStartDateFromRange(range);

    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId),
      type: "expense",
    };

    if (startDate) {
      matchStage.date = { $gte: startDate };
    }
    const categoryBreakdown =
    await transactionModel.aggregate([
        {
            $match: matchStage,
        },
        {
            $group: {
                _id: "$category",
                total: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                total: -1,
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                total: 1,
            },
        },
    ]);

    res.status(200).json({
      success: true,
      data: categoryBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

const getInsights = async (req, res, next) => {
  try {
    const userId = req.userId;

    const range = req.query.range || "12m";

    if(!validateRange(range)) {
      return res.status(400).json({
        success: false,
        message: "Invalid range. Allowed values: 3m, 6m, 12m, and all.",
      });
    }

    const savings = await calculateSavings(userId, range);

    const topCategory = await getTopCategory(userId, range);

    const expenseTrend = await getExpenseTrend(userId);

    const budgetAlert = await getBudgetAlert(userId);
    
    

    res.status(200).json({
      success: true,
      data: {
        savings,
        topCategory,
        expenseTrend,
        budgetAlert
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMonthlyTrend,
  getIncomeExpenseTrend,
  getFilteredCategoryBreakdown,
  getInsights
};