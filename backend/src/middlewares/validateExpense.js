const validateExpense = (req, res, next) => {
    const { amount, description, category, date } = req.body;

    if (!amount || !description || !category) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required'
        });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Amount must be a positive number'
        });
    }

    if(description.trim().length < 3) {
        return res.status(400).json({
            success: false,
            error: 'Description is too short'
        });
    }

    if(category.trim().length < 3) {
        return res.status(400).json({
            success: false,
            error: 'Category is too short'
        });
    }

    next();
};

module.exports = validateExpense;