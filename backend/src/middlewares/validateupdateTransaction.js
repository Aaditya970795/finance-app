const validateUpdateTransaction = (req, res, next) => {
    const { amount, type, category, date } = req.body;
    
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            error: 'At least one field is required for update'
        });
    }

    if(amount !== undefined) {
        if(typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Amount must be a positive number'
            });
        }
    }
    if(type !== undefined) {
        if(type !== 'income' && type !== 'expense') {
            return res.status(400).json({
                success: false,
                error: 'Invalid transaction type'
            });
        }
    }
    if(category !== undefined) {
        if(typeof category !== 'string' || category.trim().length < 3) {
            return res.status(400).json({
                success: false,
                error: 'Category must be at least 3 characters long'
            });
        }
    }

    if(date !== undefined) {
        if(isNaN(new Date(date).getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid date format'
            });
        }
    }

    next();
};

module.exports = validateUpdateTransaction;