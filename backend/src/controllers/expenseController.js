const mongoose = require('mongoose');
const expenseModel = require('../models/expenseModel');

const addExpense = async (req, res) => {
    try {

        const { amount, description, category, date } = req.body;

        const userId = req.userId;

        const expense = await expenseModel.create({
            userId,
            amount,
            description,
            category,
            date
        });

        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            expense
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const getExpenses = async (req, res) => {
    try {

        const userId = req.userId;

        const expenses = await expenseModel
            .find({ userId })
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        if(mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid expense ID' });
        }

        const { amount, description, category, date } = req.body;
        const userId = req.userId;

        const expense = await expenseModel.findById(id);

        if (!expense) {
            return res.status(404).json({ 
                success: false,
                error: 'Expense not found' });
        }

        if (expense.userId.toString() !== userId) {
            return res.status(403).json({ 
                success: false,
                error: 'Unauthorized' });
        }

        expense.amount = amount ?? expense.amount;
        expense.description = description ?? expense.description;
        expense.category = category ?? expense.category;
        expense.date = date ?? expense.date;

        await expense.save();

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            expense
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if(mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid expense ID' });
        }

        const userId = req.userId;

        const expense = await expenseModel.findById(id);
        if (!expense) {
            return res.status(404).json({ 
                success: false,
                error: 'Expense not found' });
        }

        if (expense.userId.toString() !== userId) {
            return res.status(403).json({ 
                success: false,
                error: 'Unauthorized' });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({ 
            success: false,
            error: 'Internal server error' });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};