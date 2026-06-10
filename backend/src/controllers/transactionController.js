const mongoose = require('mongoose');
const transactionModel = require('../models/transactionModel');

const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, note, date } = req.body;
        const userId = req.userId;

        const transaction = await transactionModel.create({
            userId,
            type,
            amount,
            category,
            note,
            date
        });

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            page = 1,
            limit = 10,
            type,
            category,
            month,
            year,
            sort = 'desc'
        } = req.query;
        
        const filter = { userId };

        if(type) filter.type = type;
        if(category) filter.category = category;

        if(month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);
            filter.date = { $gte: startDate, $lte: endDate };
        }

        const skip = (page - 1) * limit;

        const sortOrder = sort === 'asc' ? 1 : -1;

        const transactions = await transactionModel
            .find(filter)
            .sort({ date: sortOrder })
            .skip(skip)
            .limit(Number(limit));


        const totalTransactions = await transactionModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTransactions / limit),
            totalTransactions,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid transaction ID'
            });
        }

        const userId = req.userId;
        const { type, amount, category, note, date } = req.body;

        const transaction = await transactionModel.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        if (transaction.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized'
            });
        }

        transaction.type = type ?? transaction.type;
        transaction.amount = amount ?? transaction.amount;
        transaction.category = category ?? transaction.category;
        transaction.note = note ?? transaction.note;
        transaction.date = date ?? transaction.date;

        await transaction.save();

        res.status(200).json({
            success: true,
            message: 'Transaction updated successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const deleteTransaction = async (req, res) => { 
    try {
        const transactionId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid transaction ID'
            });
        }

        const userId = req.userId;

        const transaction = await transactionModel.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        if (transaction.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized'
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction };