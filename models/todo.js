const mongoose=require("mongoose")
const {Schema,model}=mongoose

const schema=new Schema({
    uid:{type:String},
    title:{type:String},
    location:{type:String},
    description:{type:String},
    id:{type:String}
},{timestamps:true})

const Todos=model("todos",schema)

module.exports=Todos