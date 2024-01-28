const Note = require('../models/Notes');

// create note function
const createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (!title || !description) {
            return res.status(400).send({ message: "Both fields required !" })
        }
        const noteObj = new Note({
            title, description, tag,
            user: req.user.id
        })
        const newNote = await noteObj.save();
        res.status(200).send({ message: "Note created !",data:newNote })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}

// get all notes 
const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Note.find({ user: req.user.id });
        res.status(200).send({ message: "All notes fetched", data: allNotes })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}


// update an existing note and log in required
const updateNote = async (req, res) => {
    try {
        const noteId = req.params.note_id;
        const checkNote = await Note.findOne({ _id: noteId });
        if (!checkNote) {
            return res.status(400).send("Nots doesn't exist")
        }
        if (checkNote.user.toString() !== req.user.id) {
            return res.status(400).send("User not allowed")
        }
        const { title, description, tag } = req.body;
        if (!title || !description) {
            return res.status(400).send({ message: "Both fields required !" })
        }
        let note = await Note.findByIdAndUpdate(noteId, { $set: { title, description, tag } });
        res.status(200).send({ message: "Note Updated !" })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}

// delete an exisitng note
const deleteNote = async(req,res)=>{
   try {
            const checkNote = await Note.findById(req.params.note_id);
            console.log(checkNote)
            if (!checkNote) {
                return res.status(400).send("Note doesn't exist")
            }
            if (checkNote.user.toString() !== req.user.id) {
                return res.status(400).send("User not allowed")
            }
            let delNote = await Note.findByIdAndDelete(req.params.note_id);
            res.status(200).send({ message: "Note Deleted !" })
   } catch (error) {
    res.status(500).send({ error: error.message, message: "Internal server error" })
   }
}
module.exports = { createNote, getAllNotes, updateNote,deleteNote }