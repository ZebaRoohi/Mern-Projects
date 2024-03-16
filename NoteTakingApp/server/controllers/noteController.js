const Note=require('../models/Note')

//get all notes
exports.getNotes=async(req,res)=>{
    try{
        const notes=await Note.find()
        res.status(200).json(notes)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//get notes byid
exports.getNoteId=async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:'No note found'})
        }
        res.json(note)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//create note
exports.createNote=async(req,res)=>{
    try{
        const{title,content}=req.body
        const newNote=await Note.create({
            title:title,content:content,date:new Date()
        })
        const saveNote=await newNote.save()
        res.status(201).json(saveNote)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//update note
exports.updateNote=async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:"No note found"})
        }
        //destructure the title and content
        const{title,content}=req.body

        //update to new notes
        note.title=title,
        note.content=content;
        
        const updatedNote=await note.save()
        res.status(200).json(updatedNote)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//delete note
exports.deleteNote=async(req,res)=>{
    try{
        const deleteNote=await Note.findOneAndDelete({_id:req.params.id})
        if(!deleteNote){
            return res.status(404).json({message:"No note found to delete"})
        }
        res.status(200).json(deleteNote)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
