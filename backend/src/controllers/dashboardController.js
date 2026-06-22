const mongoose = require('mongoose');
const transactionModel = require('../models/transactionModel');
const budgetModel = require('../models/budgetModel');

const { getBudgetUtilization } = require('../utils/analytics/getBudgetUtilization');
const getCurrentMonthRange = require("../utils/date/getCurrentMonthRange");

const { startDate, endDate } = getCurrentMonthRange();

const getDashboardSummary = async (req, res, next) => {
    try {
        const userId = req.userId;

        const totalIncomeResult = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId),
                date: {
                $gte:startDate,
                $lt:endDate
            },
            type: 'income' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpensesResult = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId),
                date:{
                $gte:startDate,
                $lt:endDate
            },
            type: 'expense' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].total : 0;

        const totalExpenses = totalExpensesResult.length > 0 ? totalExpensesResult[0].total : 0;
        
        const balance = totalIncome - totalExpenses;

        const recentTransactions = await transactionModel.find({ userId }).sort({ date: -1 }).limit(5);

        res.status(200).json({ success: true, summary: { totalIncome, totalExpenses, balance, recentTransactions } });

    } catch (error) {
        next(error);
    }
};

const getCategoryBreakdown = async (req, res, next) => {
    try {
        const userId = req.userId;

        const categoryBreakdown = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId),
                date:{
                    $gte:startDate,
                    $lt:endDate
                },
                type: 'expense' } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } },
            { $project: {_id: 0, category: '$_id', total: 1} }
        ]);

        res.status(200).json({ success: true, data : categoryBreakdown });

    } catch (error) {
        next(error);
    }
};


const getMonthlyOverview = async (req, res, next) => {
    try {
        const userId = req.userId;

        const monthlyOverview = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: { month: { $dateToString: { format: "%Y-%m", date: "$date" } }, transactionType: "$type" }, total: { $sum: "$amount" } } },
            { $sort: { '_id.month': 1 } },
            { $project: {_id: 0, month: '$_id.month', type: '$_id.transactionType', total: 1} }
        ]);

        res.status(200).json({ success: true, data: monthlyOverview });

    } catch (error) {
        next(error);
    }
};

const getBudgetVsExpenses = async (req, res, next) => {
    try {
        const userId = req.userId;

        const budgetUtilization = await getBudgetUtilization(userId);

        res.status(200).json({
            success: true,
            data: budgetUtilization
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardSummary, getCategoryBreakdown, getMonthlyOverview, getBudgetVsExpenses };