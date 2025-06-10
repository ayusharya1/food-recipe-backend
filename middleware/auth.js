const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const verifyToken=async(req,res,next)=>{
    let token=req.headers["authorization"]
    if(token){
        token=token.split(" ")[1]//taki sirf token wala part aye bearer nhi
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({
                    message:"Invalid token"
                })
            }
            else{
                console.log(decoded);
                req.user=decoded
                next()
            }
             
        })
       
    }
    else{
        return res.status(400).json({
            message:"token not found"
        })
    }
}
module.exports=verifyToken