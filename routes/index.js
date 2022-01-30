// Used to handle the API calls.
const express = require('express');
// Import the api calls for the notes.
const notesRouter = require('./apiRoutes.js');

// Creates an express app.
const app = express();
// Uses the noteRouter, setting its calls to the /notes path.
app.use('/notes', notesRouter);

// Exports to be used in the main server.
module.exports = app;