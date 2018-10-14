const express = require('express');
const app = express();
const sendRouter = require('./routes/send');
const resetRouter = require('./routes/reset');

app.use('/send', sendRouter);
app.use('/reset', resetRouter);

module.exports = app;