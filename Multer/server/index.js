const express=require('express')
const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')

const app=express()
const port=4000

//Multer confirgeration
const storage = multer.diskStorage({
destination:'./uploads/',
filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
}
})

const upload=multer({
    storage:storage
}).single('file')

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/multerDB')
.then(()=>console.log('DB is connected successfully'))
.catch((e)=>console.log('Err in establishing connection',e))


//Define models for uploading files
const File=mongoose.model('File',{
    name:String,
    path:String
})

//Post routes for file uplaods
app.post('/upload',(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            console.log("Error in uploading file",err)
            return res.status(500).json({error:err.message})
        }
        if(!req.file){
            return res.status(400).json({message:'No file uploaded'})
        }
        const file=new File({
            name:req.file.originalname,
            path:req.file.path
        })
        try{
            await file.save()
            res.status(201).json({message:'File uploaded successfully'})
        }catch(err){
            console.log('Err in uploading',err)
            res.status(500).json({error:'Server error'})
        }
    })
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})