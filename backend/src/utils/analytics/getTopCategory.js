const mongoose = require("mongoose");
const transactionModel = require("../../models/transactionModel");

const getStartDateFromRange = require("../getStartDateFromRange");

const getTopCategory = async (userId, range) => {
    const startDate = getStartDateFromRange(range); 

    const matchStage = {
        userId: new mongoose.Types.ObjectId(userId),
        type: "expense",
    };

    if (startDate) {
        matchStage.date = { $gte: startDate };
    }

    const result = await transactionModel.aggregate([
        { $match: matchStage },
        { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
        { $sort: { totalSpent: -1 } },
        { $limit: 1 }
    ]);

    if(!result.length) {
        return {
            category: null,
            amount: 0
        }
    }

    return {
        category: result[0]._id,
        amount: result[0].totalSpent
    }
};

module.exports = getTopCategory