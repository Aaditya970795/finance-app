const express = require('express');

const router = express.Router();

const { addExpense, getExpenses, updateExpense, deleteExpense  } = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateExpense = require('../middlewares/validateExpense');

router.post('/', authMiddleware, validateExpense, addExpense);
router.get('/', authMiddleware, getExpenses);
router.put('/:id', authMiddleware, validateExpense, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;