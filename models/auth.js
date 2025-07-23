const mongoose=require("mongoose")
const {Schema,model}=mongoose


const schema=new Schema({
    uid:{type:String,required:true,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    fullName:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true})

const User=model("users",schema)

module.exports=User

