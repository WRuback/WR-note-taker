const notesRouter = require("express").Router();

notesRouter.get("/", (req,res) => {
    res.send("Notes get working.")
});

notesRouter.post("/", (req,res) => {
    res.send("Notes post working.")
});

module.exports = notesRouter;