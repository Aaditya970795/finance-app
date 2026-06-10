const validateTransaction = (req, res, next) => {
    const { amount, type, category, date } = req.body;

    if(amount === undefined || !type || !category) {
        return res.status(400).json({
            success: false,
            error: 'Amount, type, and category are required'
        });
    }

    if(typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Amount must be a positive number'
        });
    }

    if(type !== 'income' && type !== 'expense') {
        return res.status(400).json({
            success: false,
            error: 'Invalid transaction type'
        });
    }

    if(typeof category !== 'string' || category.trim().length < 3) {
        return res.status(400).json({
            success: false,
            error: 'Category must be at least 3 characters long'
        });
    }

    if(date && isNaN(new Date(date).getTime())) {
        return res.status(400).json({
            success: false,
            error: 'Invalid date format'
        });
    }

    next();
};

module.exports = validateTransaction;