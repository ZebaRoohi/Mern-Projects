const express=require('express')
const mongoose=require('mongoose')
const app=express()
const noteRoute=require('./routes/noteRoute')
const bodyParser=require('body-parser')
const cors=require('cors')
const port=5000

//connection
mongoose.connect('mongodb://localhost:27017/noteapp')
.then(()=>console.log('DB is connected'))
.catch((err)=>console.log("Err is establishing connection",err))

//middle wares
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use('/api/notes',noteRoute)

app.listen(port,()=>console.log(`Sever is running at ${port}`))
