const express=require("express")
const router=express.Router()
const Todos=require("../models/todo")
const {verifyToken}=require("../middlewares/auth")


router.post("/post",verifyToken, async(req,res)=>{
try{
    const todo=req.body
    const {uid}=req
    const data=new Todos({uid,...todo})
    await data.save()
    res.status(200).json({message:"Todo created success full",isError:false,todo:data})
}catch(error){
    res.status(500).json({message:"Something went wrong well getting todo",isError:true,error})
    console.error("error giving by adding todo",error)

}
})

router.get("/get",verifyToken,async (req,res)=>{
    try{

        const {uid}=req
        const todo=await Todos.find({uid}).sort({_id:-1})
        res.status(200).json({message:"Todo get successful",isError:false,todo})
    }catch(error){
        res.status(500).json({message:"Something error well getting todo",isError:true,error})

    }
})

router.patch("/update/:id",verifyToken, async(req,res)=>{
    try{
        const {uid}=req
        const {id}=req.params
        const updateData=req.body
        const upadataTodo=await Todos.findOneAndUpdate({uid,id},updateData,{new:true})
        if(!upadataTodo){return res.status(401).json({ message: "Todo not found or not yours" });}
        res.status(200).json({message:"Todo update success fully",isError:false,todo:upadataTodo})
    }catch(error){
        res.status(500).json({message:"Something went wrong while updating todo",isError:true,error})
        console.log("todo error",error)
    }

})
router.delete("/delete/:id",verifyToken, async(req,res)=>{
    try{
        const {uid}=req
        const {id}=req.params
        const upadataTodo=await Todos.findOneAndDelete({id,uid},)
        if(!upadataTodo){return res.status(401).json({ message: "Todo not found or not yours" });}
        res.status(200).json({message:"Todo update success fully",isError:false,todo:upadataTodo})
    }catch(error){
        res.status(500).json({message:"Something went wrong while updating todo",isError:true,error})
        console.log("todo error",error)
    }

})

module.exports=router