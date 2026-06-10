const validateBudget = (req, res, next) => {
    const { category, limit, month, year } = req.body;

    if (!category || !limit || !month || !year) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (typeof limit !== 'number' || limit <= 0) {
        return res.status(400).json({ success: false, error: 'Limit must be a positive number' });
    }

    if (typeof month !== 'number' || month < 1 || month > 12) {
        return res.status(400).json({ success: false, error: 'Month must be between 1 and 12' });
    }

    next();
};

module.exports = validateBudget;