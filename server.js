// Used to handle HTTPS calls.
const express = require('express');
// Used to handle file paths.
const path = require('path');
// Used to store and ogranize the API calls.
const api = require('./routes/index.js');

// This PORT is used so the program can work in Heroku. If not deployed in Heroku, use PORT 3001 instead.
const PORT = process.env.PORT || 3001;

// Creates the express object.
const app = express();

// Lets express understand JSON and parse URL's.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Brings in the api calls from index, and sets them in the /api path.
app.use("/api", api);

// Set's the public folder as the folder for the static files.
app.use(express.static("public"));

// Sends the notepage on call.
app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// On any GET call that is not recognized, send the homepage.
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Set the app to listen on the port (Either Heroku or 3001).
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);