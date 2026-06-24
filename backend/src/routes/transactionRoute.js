const express = require('express');
const router = express.Router();

const { createTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateTransaction = require('../middlewares/validateTransaction');
const validateUpdateTransaction = require('../middlewares/validatepdateTransaction');
const validateMiddleware = require('../middlewares/validateMiddleware');

/*
    @route POST /api/transactions
    @desc Create a new transaction
    @access Private
*/
router.post('/', authMiddleware, validateTransaction, validateMiddleware, createTransaction);

/*
    @route GET /api/transactions
    @desc Get all transactions
    @access Private
*/
router.get('/', authMiddleware, getTransactions);

/*
    @route PUT /api/transactions/:id
    @desc Update a transaction
    @access Private
*/
router.put('/:id', authMiddleware, validateUpdateTransaction, validateMiddleware, updateTransaction);

/*
    @route DELETE /api/transactions/:id
    @desc Delete a transaction
    @access Private
*/
router.delete('/:id', authMiddleware, deleteTransaction);

module.exports = router;