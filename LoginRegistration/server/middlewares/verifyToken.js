const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token

if(!token){
    return res.status(401).json({message:'No token provided'})
}
jwt.verify(token,'secret',(err,decode)=>{
    if(err){
        return res.status(403).json({message:"Failed to authenticate token"})
    }
    req.userId=decode.userId;
    next()
})
}
module.exports=verifyToken