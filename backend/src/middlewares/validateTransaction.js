const { body } = require('express-validator');

const validateTransaction = [
    body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .bail()
        .isFloat({ min: 1})
        .withMessage('Amount must be a positive number'),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('Type is required')
        .bail()
        .isIn(['income', 'expense'])
        .withMessage('Invalid transaction type'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters long'),

    body('date')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
];


module.exports = validateTransaction;