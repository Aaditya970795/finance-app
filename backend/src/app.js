const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRoute = require('./routes/authRoute');
const expenseRoute = require('./routes/expenseRoute');
const analyticsRoute = require('./routes/analyticsRoute');
const budgetRoute = require('./routes/budgetRoute');
const transactionRoute = require('./routes/transactionRoute');

app.use('/api/transactions', transactionRoute);

app.use('/api/budgets', budgetRoute);


app.use('/api/auth', authRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/analytics', analyticsRoute);

module.exports = app;