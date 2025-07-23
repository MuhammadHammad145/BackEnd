const express=require("express")
const router=express.Router()
const User=require("../models/auth")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {getRandomId}=require("../config/global")
const {verifyToken}=require("../middlewares/auth")



router.post("/register",async(req,res)=>{
    try{
        console.log("frontend ",req.body)
        const {firstName,lastName,fullName,email,password}=req.body
        const user=await User.findOne({email})
        if(user){return res.status(401).json({message:"You have already register",isError:true})}
        const hashPassword=await bcrypt.hash(password,10)
        const uid=getRandomId()
        const userData={uid,firstName,lastName,fullName,email,password:hashPassword}
        const newUser=new User(userData)
        await newUser.save()
    
        res.status(201).json({message:"You wil register successfully",isError:false,user:newUser})
        
    } catch(error){
        console.error("register error",error)
        res.status(500).json({message:"Some thing wrong will register",isError:true,error})
    } 

})

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){return res.status(401).json({message:"You have not been register",isError:true})}

        const match=await bcrypt.compare(password,user.password)
         if (!match) {
      return res.status(401).json({ message: "Incorrect password", isError: true });
        } 
        const {uid}=user
        const token=jwt.sign({uid},"Ya Hussain")
        res.status(201).json({message:"You have login success fully",isError:false,token})
    }catch(error){
        res.status(500).json({message:"Something well getting error in login",isError:true})

    }
})

router.get("/get",verifyToken,async(req,res)=>{
    try{

        const {uid}=req
        const user=await User.findOne({uid}).select('-password')
        if(!user){
            return res.status(401).json({message:"something went error well getting user",isError:true})
        }
          res.status(201).json({message:"User get  success fully",isError:false,user})
        }catch(error){
        res.status(500).json({message:"something went wrong will getting user",isError:true,error})

    }
})

router.post("/logout", verifyToken, (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});


module.exports=router
