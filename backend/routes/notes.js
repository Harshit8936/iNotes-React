const router = require('express').Router();
const noteController = require('../controllers/noteController');
const fetchUser = require('../middleware/fetchUser')

router.get('/fetchallnotes',fetchUser,noteController.getAllNotes);
router.post('/addnote',fetchUser,noteController.createNote);
router.put('/updatenote/:note_id',fetchUser,noteController.updateNote);
router.delete('/deletenote/:note_id',fetchUser,noteController.deleteNote);

module.exports = router;