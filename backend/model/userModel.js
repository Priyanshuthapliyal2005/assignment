const mongoose=require("mongoose");
const CryptoJs=require("crypto-js")
const CRYPTO_SECRET=require("../config/secret").Salt_Secret;
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
},{timestamps:true})

userSchema.methods.matchPassword=async function(enteredPassword){
    const hashPassword = CryptoJs.AES.decrypt(this.password,CRYPTO_SECRET);
    const originalPassword = hashPassword.toString(CryptoJs.enc.Utf8);

    if(originalPassword === enteredPassword)return true;
    else return false;
}
const User=mongoose.model("User",userSchema);
module.exports=User;