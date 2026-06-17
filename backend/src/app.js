const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const authRoute = require('./routes/authRoute');
const budgetRoute = require('./routes/budgetRoute');
const transactionRoute = require('./routes/transactionRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');


app.use('/api/dashboard', dashboardRoute);

app.use('/api/transactions', transactionRoute);

app.use('/api/budgets', budgetRoute);


app.use('/api/auth', authRoute);

app.use(errorMiddleware);

module.exports = app;