const mongoose = require('mongoose');
const transactionModel = require('../models/transactionModel');
const budgetModel = require('../models/budgetModel');

const getDashboardSummary = async (req, res, next) => {
    try {
        const userId = req.userId;

        const totalIncomeResult = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'income' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpensesResult = await transactionModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'expense' } },
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
            { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'expense' } },
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

        const budgets = await budgetModel.find({ userId });

        const budgetVsExpenses = await Promise.all(
            budgets.map(async (budget) => {

                const startDate = new Date(
                    budget.year,
                    budget.month - 1,
                    1
                );

                const endDate = new Date(
                    budget.year,
                    budget.month,
                    1
                );

                const expenseResult = await transactionModel.aggregate([
                    {
                        $match: {
                            userId: new mongoose.Types.ObjectId(userId),
                            type: "expense",
                            category: budget.category,
                            date: {
                                $gte: startDate,
                                $lt: endDate
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            spent: { $sum: "$amount" }
                        }
                    }
                ]);

                const spent =
                    expenseResult.length > 0
                        ? expenseResult[0].spent
                        : 0;

                const remaining = budget.limit - spent;

                const percentageUsed =
                    budget.limit > 0
                        ? Number(
                              ((spent / budget.limit) * 100).toFixed(2)
                          )
                        : 0;

                return {
                    _id: budget._id,
                    category: budget.category,
                    month: budget.month,
                    year: budget.year,
                    limit: budget.limit,
                    spent,
                    remaining,
                    percentageUsed
                };
            })
        );

        res.status(200).json({
            success: true,
            data: budgetVsExpenses
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardSummary, getCategoryBreakdown, getMonthlyOverview, getBudgetVsExpenses };