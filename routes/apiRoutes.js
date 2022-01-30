// Used for HTTPS calls.
const express = require("express");
// Used to generate unique ID's for the notes.
const { v4: uuidv4 } = require("uuid");
// Used to make reading and writing to files easier.
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// Sets up the router object.
const notesRouter = express.Router();

// On GET, read the database file and return it's contents in JSON format.
notesRouter.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// On POST, Take the data, and save it as a new note in the database file.
// If not in proper format, the it returns that it failed.
notesRouter.post("/", (req, res) => {
    // Get data from the body.
    const { title, text } = req.body;

    // If the data exists, put it in the database file. If not, don't.
    if (title && text) {
        // Make the item for the database.
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        //Adds it to the database.
        readAndAppend(newNote, './db/db.json');

        // Say that it was successful.
        const output = {
            status: 'success',
            body: newNote,
        };
        console.log("note's POST successful.")
        res.json(output);
    }else{
        res.json('Error in adding note to DB.');
    }
});

// On Delete, the ID given in the parameter is found, removed, and the Database is Re-saved.
notesRouter.delete("/:id", (req, res) => {
    // Gets the information from the database file.
    readFromFile("./db/db.json").then((rawData) => {
        // Parse the data into a workable object.
        const data = JSON.parse(rawData);
        // Filter out any notes that math the ID given in the parameter.
        const newNotes = data.filter((element) => {
            return element.id !== req.params.id;
        });
        // If the newnotes is different from the data, write the new notes, and respond.
        if(newNotes !== data){
            writeToFile("./db/db.json", newNotes);
            console.log("note DELETE successful.")
            res.json(`Note sucessfully deleted.`);
        }
        else{
            // If it wasn't different, let them know.
            res.json(`Error in deleting note. Could not be found.`);
        }
    });
});

// Exports the router to be used in the Index.
module.exports = notesRouter;