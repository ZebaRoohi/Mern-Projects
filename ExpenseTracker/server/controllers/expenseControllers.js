const Expense=require('../models/Expense')

//Get all expenses
exports.getAllExpense=async(req,res)=>{
    try{
        const expenses=await Expense.find();
        return res.status(200).json(expenses)
    }catch(err){
        console.log('Error in fetching the expenses',err)
        res.status(500).json({message:'Internal Server error'})
    }
}

//Get by id
exports.getExpenseById=async(req,res)=>{
    try{
        const expense=await Expense.findById(req.params.id)
        if(!expense){
            return res.status(404).json({message:'No Expense detail found'})
        }
        res.json(expense)
    }catch(err){
        console.log('Error in fetching the requested expense',err)
        res.status(500).json({message:'Internal Server error'})
    }
}
//create expenses
exports.createExpense=async(req,res)=>{
  const {description,amount}=req.body;
  try{
    if(!description || !amount){
        return res.status(400).json({message:'Description and amount are required'})
    }
    const newExpense=await Expense.create({description,amount})
    await newExpense.save()
    res.status(201).json(newExpense)
  }catch(err){
    console.log('Error in saving expenses',err)
    res.status(500).json({message:'Internal server error'})
  }
}

//Delete Expense
exports.deleteExpense=async(req,res)=>{
    try{
        const expense=await Expense.findOneAndDelete({_id:req.params.id})
        if(!expense){
            return res.status(404).json({message:"No note found to delete"})
        }
        res.status(200).json(expense)
    }catch(err){
        console.log('Error in deleteing the expense',err)
        res.status(500).json({message:'Internal server error'})
    }
}
//Update expenses
exports.updateExpense=async(req,res)=>{
    try{
        const expense=await Expense.findById(req.params.id)
        if(!expense){
            return res.status(404).json({message:"No note found"})
        }
        //destructure the descroption and amount
        const{description,amount}=req.body

        //update to new expenses
        expense.description=description,
        expense.amount=amount;
        
        const updatedExpense=await expense.save()
        res.status(200).json(updatedExpense)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}