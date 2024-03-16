const noteController=require('../controllers/noteController')
const express=require('express')
const router=express.Router()

//endpoints
router.get('/',noteController.getNotes)
router.post('/',noteController.createNote)
router.get('/:id',noteController.getNoteId)
router.put('/:id',noteController.updateNote)
router.delete('/:id',noteController.deleteNote)

module.exports=router