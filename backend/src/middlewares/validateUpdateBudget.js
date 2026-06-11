const { body } = require('express-validator');

const validateUpdateBudget = [
    body('category')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters long'),

    body('limit') 
        .optional()
        .isFloat({ min: 1})
        .withMessage('Limit must be a positive number'),

    body('month')
        .optional()
        .isInt({ min: 1, max: 12 })
        .withMessage('Month must be between 1 and 12'),

    body('year')
        .optional()
        .isInt({ min: 2020})
        .withMessage("Enter a valid year")
];

module.exports = validateUpdateBudget;