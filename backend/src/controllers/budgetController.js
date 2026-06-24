const mongoose = require('mongoose');
const budgetModel = require('../models/budgetModel');
const AppError = require('../utils/temp');
// Create a new budget
const createBudget = async (req, res, next) => {
    try {
        const { category, limit, month, year } = req.body;
        const userId = req.userId;

        const existingBudget = await budgetModel.findOne({ userId, category, month, year });
        if (existingBudget) {
            throw new AppError('Budget with this category, month and year already exists', 400);
        }

        const budget = await budgetModel.create({ userId, category, limit, month, year });

        res.status(201).json({ success: true, message: 'Budget created successfully', budget });
    } catch (error) {
        next(error);
    }
};

const getBudgets = async (req, res, next) => {
    try {
        const userId = req.userId;
        const budgets = await budgetModel.find({ userId }).sort({ year: -1, month: -1 });
        res.status(200).json({ success: true, budgets });
    } catch (error) {
        next(error);
    }
};

const updateBudget = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid budget ID' });
        }

        const { category, limit, month, year } = req.body;
        const userId = req.userId;

        const budget = await budgetModel.findOne({ userId, _id: id });
        if (!budget) {
            throw new AppError('Budget not found', 404);
        }

        budget.category = category ?? budget.category;
        budget.limit = limit ?? budget.limit;
        budget.month = month ?? budget.month;
        budget.year = year ?? budget.year;

        await budget.save();

        res.status(200).json({ success: true, message: 'Budget updated successfully', budget });
    } catch (error) {
        next(error);
    }
};

const deleteBudget = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid budget ID' });
        }

        const userId = req.userId;

        const budget = await budgetModel.findOne({ userId, _id: id });
        if (!budget) {
            throw new AppError('Budget not found', 404);
        }

        await budget.deleteOne();    

        res.status(200).json({ success: true, message: 'Budget deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
};