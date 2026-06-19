const { getBudgetUtilization } = require("./getBudgetUtilization");

const getBudgetAlert = async (userId) => {
    const budgets = await getBudgetUtilization(userId);

    if (!budgets.length) {
        return {
            category: null,
            percentageUsed: 0,
            spent: 0,
            limit: 0,
            remaining: 0,
            message: "No budgets found.",
        };
    }

    const alert = budgets.reduce((highest, current) => {
        return current.percentageUsed > highest.percentageUsed
            ? current
            : highest;
    });

    let message;

    if (alert.percentageUsed >= 100) {
        message = `${alert.category} budget has been fully utilized.`;
    } else if (alert.percentageUsed >= 90) {
        message = `${alert.category} budget is almost exhausted (${alert.percentageUsed}% used).`;
    } else if (alert.percentageUsed >= 75) {
        message = `${alert.category} budget is ${alert.percentageUsed}% utilized.`;
    } else {
        message = `${alert.category} budget usage is under control (${alert.percentageUsed}% used).`;
    }

    return {
        category: alert.category,
        percentageUsed: alert.percentageUsed,
        spent: alert.spent,
        limit: alert.limit,
        remaining: alert.remaining,
        message,
    };
};

module.exports = {
    getBudgetAlert,
};