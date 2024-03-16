const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const port=3000
const app=express()
const authRoute=require('./routes/authRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/loginregistration')
.then(()=>console.log('DB connnected'))
.catch((err)=>console.log('Err establishing conn',err))

app.use('/api/user',authRoute)

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})