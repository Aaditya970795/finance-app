const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validateLogin = (req, res, next) => {
    // // console.log('Validating login data:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if(password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    if(isValidEmail(email) === false) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    next();
};

module.exports = validateLogin;