const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateRegister = (req, res, next) => {
    console.log('Validating registration data:', req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if(password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    if(username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }
    if(isValidEmail(email) === false) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    next();
};

module.exports = validateRegister;