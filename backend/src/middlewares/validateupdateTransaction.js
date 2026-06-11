const { body } = require('express-validator');

const validateUpdateTransaction = [
    body('amount')
        .optional()
        .isFloat({ min: 1})
        .withMessage('Amount must be a positive number'),

    body('type')
        .optional()
        .isIn(['income', 'expense'])
        .withMessage('Invalid transaction type'),

    body('category')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters long'),

    body('date')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
]


module.exports = validateUpdateTransaction;