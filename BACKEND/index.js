const express=require("express")
require('dotenv').config()
const {connection}=require("./config/db")
// const {authenticate}=require("./Middleware/auth.middleware")
const {userRouter}=require("./routes/user.routes")
const {productRouter}=require("./routes/products.rotes")
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
// app.use(authenticate)
app.use("/products",productRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("Connected to server on port 4500")
})