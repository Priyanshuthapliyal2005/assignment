const JWT=require("jsonwebtoken");
const JWT_Secret=require("./secret").JWT_Secret;


const generateToken=(id)=>{
   return JWT.sign({id},JWT_Secret,{expiresIn:"30d"});
}

module.exports=generateToken