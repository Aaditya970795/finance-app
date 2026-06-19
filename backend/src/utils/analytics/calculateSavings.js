const mongoose = require('mongoose');
const transactionModel = require('../../models/transactionModel');
const getStartDateFromRange = require('../getStartDateFromRange');

const calculateSavings = async (userId, range) => {

    const startDate = getStartDateFromRange(range); 

    const matchStage = {
        userId: new mongoose.Types.ObjectId(userId),
    };

    if (startDate) {
        matchStage.date = { $gte: startDate };
    }

    const result = await transactionModel.aggregate([
        { $match: matchStage },
        { $group: { _id: "$type", total: { $sum: "$amount" } } }
    ]);
    
    let income = 0;
    let expense = 0;

    result.forEach(item => {
        if (item._id === 'income') {
            income = item.total;
        } else if (item._id === 'expense') {
            expense = item.total;
        }
    });

    return {
        totalIncome: income,
        totalExpense: expense,
        totalSavings: income - expense
    } 
};

module.exports = calculateSavings