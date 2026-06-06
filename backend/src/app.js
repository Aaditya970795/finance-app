const express = require('express');

const app = express();
app.use(express.json());

const authRoute = require('./routes/authRoute');

app.use('/api/auth', authRoute);

module.exports = app;