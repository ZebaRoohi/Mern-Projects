const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const expenseRoute=require('./routes/expenseRoutes')
const app=express()
const port=3000

app.use(express.json())
app.use(cors())

//connect 
mongoose.connect('mongodb://localhost:27017/expensetracker')

//routes
app.use('/expenses',expenseRoute)

app.listen(port,()=>{
    console.log(`Server is ruuning at ${port}`)

})