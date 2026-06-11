const express = require('express');
const router = express.Router();

const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateBudget = require('../middlewares/validateBudget');
const validateUpdateBudget = require('../middlewares/validateUpdateBudget');
const validateMiddleware = require('../middlewares/validateMiddleware');

/*
    @route POST /api/budgets
    @desc Create a new budget
    @access Private
*/
router.post('/', authMiddleware, validateBudget, validateMiddleware, createBudget);

/*
    @route GET /api/budgets
    @desc Get all budgets
    @access Private
*/
router.get('/', authMiddleware, getBudgets);

/*
    @route PUT /api/budgets/:id
    @desc Update a budget
    @access Private
*/
router.put('/:id', authMiddleware, validateUpdateBudget, validateMiddleware, updateBudget);

/*
    @route DELETE /api/budgets/:id
    @desc Delete a budget
    @access Private
*/
router.delete('/:id', authMiddleware, deleteBudget);


module.exports = router;