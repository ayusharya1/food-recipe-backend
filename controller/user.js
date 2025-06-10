

const User = require("../models/User");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()
const userSignUp=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            error:"email and password is required"
        })
    }
    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({
            error:"email already exist"
        })
    }
    const hashPwd=await bcrypt.hash(password,10)
    const newUser=await User.create({
        email,
        password:hashPwd
    })
    let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1hr"})
    return res.status(200).json({token,user:newUser})
}
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required"
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "Invalid Credentials"
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: "Invalid Credentials"
        });
      }
  
      const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ token, user });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    return res.json(user)
}
module.exports={userSignUp,userLogin,getUser}