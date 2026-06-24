const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const authRoute = require('./routes/authRoute');
const budgetRoute = require('./routes/budgetRoute');
const transactionRoute = require('./routes/transactionRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const analyticsRoute = require('./routes/analyticsRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');


app.use('/api/dashboard', dashboardRoute);

app.use('/api/transactions', transactionRoute);

app.use('/api/budgets', budgetRoute);

app.use('/api/analytics', analyticsRoute);

app.use('/api/auth', authRoute);

app.use(errorMiddleware);

module.exports = app;