const express = require('express');
const app = express();
const sendRouter = require('./routes/send');

app.use('/send', sendRouter);

module.exports = app;