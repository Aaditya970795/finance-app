const mongoose = require("mongoose");

const transactionModel = require("../../models/transactionModel");
const budgetModel = require("../../models/budgetModel");

const getBudgetUtilization = async (userId) => {
    const budgets = await budgetModel.find({ userId });

    const budgetUtilization = await Promise.all(
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
                            $lt: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        spent: {
                            $sum: "$amount",
                        },
                    },
                },
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
                percentageUsed,
            };
        })
    );

    return budgetUtilization;
};

module.exports = {
    getBudgetUtilization,
};