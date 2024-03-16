const express=require('express')
const router=express.Router()
const expenseController=require('../controllers/expenseControllers')

//Routes
router.get('/',expenseController.getAllExpense)
router.post('/',expenseController.createExpense)
router.get('/:id',expenseController.getExpenseById)
router.delete('/:id',expenseController.deleteExpense)
router.put('/:id',expenseController.updateExpense)

module.exports=router;