const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json('Email already exist')
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newUser= await User.create({
            name:name,
            email:email,
            password:hashedpassword
        })
        await newUser.save()
        res.status(201).json("Account created successfully")
    }catch(err){
        res.status(500).json('Internal server error')
    }
}

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json("User not found")
        }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).json('Invalid credentials')
        }
        const token=jwt.sign({userId:user._id},'secret',{expiresIn:'1h'})
        res.cookie('token',token,{httpOnly:true,maxAge:3600000}) //3600000 millisecond =1hr
        res.status(200).json('Login successfully')
    }catch(err){
        res.status(500).json("Internal server error")
    }
}

exports.dashboard=(req,res)=>{
    res.status(200).json('Welcome to dashboard')
}
exports.logout=(req,res)=>{
    res.clearCookie('token')
    res.status(200).json('Logout successfully')
}