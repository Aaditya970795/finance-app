const mongooose = require('mongoose');
const expenseModel = require('../models/expenseModel');

const getTotalExpenses = async (req, res) => {
    try {

        const userId = req.userId;

        const totalExpenses = await expenseModel.aggregate([
            { $match: { userId: new mongooose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const total = totalExpenses.length > 0 ? totalExpenses[0].total : 0;

        res.status(200).json({ success: true, totalExpenses: total });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getCategoryBreakdown = async (req, res) => {
    try {

        const userId = req.userId;

        const categoryBreakdown = await expenseModel.aggregate([
            { $match: { userId: new mongooose.Types.ObjectId(userId) } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $project: {_id: 0, category: '$_id', total: 1}}
        ]);

        res.status(200).json({ success: true, data: categoryBreakdown });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getMonthlyExpenses = async (req, res) => {
    try {

        const userId = req.userId;

        const monthlyExpenses = await expenseModel.aggregate([
            { $match: { userId: new mongooose.Types.ObjectId(userId) } },
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, total: { $sum: "$amount" } } },
            { $sort: { _id: 1 } },
            { $project: {_id: 0, month: '$_id', total: 1} }
            
        ]);

        res.status(200).json({ success: true, data: monthlyExpenses });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getRecentTransactions = async (req, res) => {
    try {

        const userId = req.userId;

        const recentTransactions = await expenseModel.find({ userId }).sort({ date: -1 }).limit(5);

        res.status(200).json({ success: true, data: recentTransactions });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getTotalExpenses,
    getCategoryBreakdown,
    getMonthlyExpenses,
    getRecentTransactions
};

