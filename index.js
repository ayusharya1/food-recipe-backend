const express=require("express")
const app=express()
const dotenv=require("dotenv")
const recipeRoute=require("./routes/recipe")
const connectDB=require("./config/connectionDB")
const cors=require("cors")//to connect with origin or easy way connect to frontend
dotenv.config()
connectDB()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(express.static("public"))//making public folder static that its content be used on frontend

const PORT=process.env.PORT || 3000
app.use("/recipe",recipeRoute)
app.use("/",require("./routes/user"))
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
    
})
