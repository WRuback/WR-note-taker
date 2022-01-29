const express = require('express');

const notesRouter = require('./apiRoutes.js');

const app = express();
app.use('/notes', notesRouter);

module.exports = app;