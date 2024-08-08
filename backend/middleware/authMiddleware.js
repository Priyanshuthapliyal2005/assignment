const jwt =require("jsonwebtoken");
const User=require("../model/userModel");
const asyncHandler=require("express-async-handler");
const JWT_Secret=require("../config/secret").JWT_Secret;


const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decode=jwt.verify(token,JWT_Secret);
            req.user=await User.findById(decode.id).select("-password");
            next();
        }catch(err){
            res.status(401);
            throw new Error("Not Authorized, token failed");
        }
    }
})

module.exports={protect}