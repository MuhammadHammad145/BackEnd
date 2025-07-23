const jwt=require("jsonwebtoken")



const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization
    console.log("authHeader",authHeader)
    const token=authHeader?.split(" ")[1]
    console.log("token",token)
    if(!token){return res.status(401).json({message:"Access Token is missing"})}
    jwt.verify(token,"Ya Hussain", async(error,result)=>{
        if(!error){
            req.uid=result.uid
            next()
        }else{
            console.error(error)
            res.status(401).json({message:"Unauthorized or user doesn't have access"})
        }
    })
}

module.exports={verifyToken}