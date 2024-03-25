const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, noteController.getNotes);
router.get('/:id', authMiddleware, noteController.getNoteId);
router.post('/', authMiddleware, noteController.createNote);
router.put('/:id', authMiddleware, noteController.updateNote);
router.delete('/:id', authMiddleware, noteController.deleteNote);

module.exports = router;
