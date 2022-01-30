const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

const notesRouter = express.Router();


notesRouter.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notesRouter.post("/", (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');

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

notesRouter.delete("/:id", (req, res) => {
    console.log(req.params.id);
    readFromFile("./db/db.json").then((rawData) => {
        const data = JSON.parse(rawData);
        console.log (data);
        const newNotes = data.filter((element) => {
            console.log(element.id);
            console.log(req.params.id);
            return element.id !== req.params.id;
        });
        console.log(newNotes);
        if(newNotes !== data){
            writeToFile("./db/db.json", newNotes);
            console.log("note's DELETE successful.")
            res.json(`Note sucessfully deleted.`);
        }
        else{
            res.json(`Error in deleting note. Could not be found.`);
        }
    });
});

module.exports = notesRouter;