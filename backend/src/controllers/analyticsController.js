const mongoose = require("mongoose");
const transactionModel = require("../models/transactionModel");

const getMonthlyTrend = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Last 12 months filter
    const lastYear = new Date();
    lastYear.setMonth(lastYear.getMonth() - 12);

    const monthlyTrend = await transactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
          date: { $gte: lastYear },
        },
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

    // Last 12 months filter
    const lastYear = new Date();
    lastYear.setMonth(lastYear.getMonth() - 12);

    const incomeExpenseTrend = await transactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: lastYear },
        },
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

const getBudgetUtilization = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Last 12 months filter
    const lastYear = new Date();
    lastYear.setMonth(lastYear.getMonth() - 12);

    const budgetUtilization = await transactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
          date: { $gte: lastYear },
        },
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
      data: budgetUtilization,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMonthlyTrend,
  getIncomeExpenseTrend
};