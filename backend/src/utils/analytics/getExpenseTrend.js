const mongoose = require("mongoose");

const transactionModel = require("../../models/transactionModel");

const getExpenseTrend = async (userId) => {
    const today = new Date();

    // Current Month
    const currentMonthStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const nextMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
    );

    // Previous Month
    const previousMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
    );

    const currentExpensePromise =
        transactionModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    type: "expense",
                    date: {
                        $gte: currentMonthStart,
                        $lt: nextMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

    const previousExpensePromise =
        transactionModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    type: "expense",
                    date: {
                        $gte: previousMonthStart,
                        $lt: currentMonthStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

    const [currentResult, previousResult] =
        await Promise.all([
            currentExpensePromise,
            previousExpensePromise,
        ]);

    const currentExpense =
        currentResult.length > 0
            ? currentResult[0].total
            : 0;

    const previousExpense =
        previousResult.length > 0
            ? previousResult[0].total
            : 0;

    let direction = "no-change";
    let percentage = 0;

    if (previousExpense === 0) {
        if (currentExpense > 0) {
            direction = "increase";
            percentage = null;
        }
    } else {
        const change =
            ((currentExpense - previousExpense) /
                previousExpense) *
            100;

        percentage = Number(Math.abs(change).toFixed(2));

        if (change > 0) {
            direction = "increase";
        } else if (change < 0) {
            direction = "decrease";
        }
    }

    return {
        currentExpense,
        previousExpense,
        direction,
        percentage,
    };
};

module.exports =  getExpenseTrend;