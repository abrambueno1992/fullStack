const CreatedNotes = require("../models/NoteModel")
const ObjectId = require("mongoose").Types.ObjectId;
const getNoteByCreatorId =  (req, res) => {
    const { Id } = req.body;
    if (req.decoded) {
        CreatedNotes.find({"_creator": new ObjectId(Id)})
            .then(notes => {
                res.send(notes)
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        return res.status(422).json({error: `Can't get the notes`})
    }

}
module.exports = {
    getNoteByCreatorId
}
