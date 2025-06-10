const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err);
        
    })
}
module.exports=connectDB