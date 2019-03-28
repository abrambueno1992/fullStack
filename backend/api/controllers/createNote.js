const CreateNote = require("../models/NoteModel")
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

const createNotes = (req, res) => {
    // const { title, note, check, tag, creator} = req.body;
    const { title, note, check, tag, _creator } = req.body;
    console.log("user: ", req.body)
    // if (req.decoded) {
        const noteData = new CreateNote({title, note, check, tag, _creator})
        noteData
            .save()
            .then(newNote =>
                res.status(201).send(newNote))
                    .catch(err => res.status(500).send(err))

    // } else {
    //     return res.status(422).json({error: "Error can't create the note"})
    // }
}

module.exports = {
    createNotes
}