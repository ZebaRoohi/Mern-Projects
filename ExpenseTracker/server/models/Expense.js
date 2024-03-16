//Model
const mongoose=require('mongoose')

const expenseSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
    }    
},
{timestamps:true}
)


const Expense=mongoose.model('Expense',expenseSchema)
module.exports=Expense