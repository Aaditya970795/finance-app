const mongoose = require('mongoose');
const budgetModel = require('../models/budgetModel');

// Create a new budget
const createBudget = async (req, res) => {
    try {
        const { category, limit, month, year } = req.body;
        const userId = req.userId;

        const existingBudget = await budgetModel.findOne({ userId, category, month, year });
        if (existingBudget) {
            return res.status(400).json({ success: false, error: 'Budget for this category and month already exists' });
        }

        const budget = await budgetModel.create({ userId, category, limit, month, year });

        res.status(201).json({ success: true, message: 'Budget created successfully', budget });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getBudgets = async (req, res) => {
    try {
        const userId = req.userId;
        const budgets = await budgetModel.find({ userId }).sort({ year: -1, month: -1 });
        res.status(200).json({ success: true, budgets });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid budget ID' });
        }

        const { category, limit, month, year } = req.body;
        const userId = req.userId;

        const budget = await budgetModel.findOne({ userId, _id: id });
        if (!budget) {
            return res.status(404).json({ success: false, error: 'Budget not found' });
        }

        budget.category = category ?? budget.category;
        budget.limit = limit ?? budget.limit;
        budget.month = month ?? budget.month;
        budget.year = year ?? budget.year;

        await budget.save();

        res.status(200).json({ success: true, message: 'Budget updated successfully', budget });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid budget ID' });
        }

        const userId = req.userId;

        const budget = await budgetModel.findOne({ userId, _id: id });
        if (!budget) {
            return res.status(404).json({ success: false, error: 'Budget not found' });
        }

        await budget.deleteOne();    

        res.status(200).json({ success: true, message: 'Budget deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
};