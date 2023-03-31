const express=require("express")
const userRouter=express.Router()
const bcrypt=require('bcrypt')
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,city,gender}=req.body
    try{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                req.send(err.message)
            }else{
                const user=new UserModel({name,email,password:hash,city,gender})
                await user.save()
                res.send({"msg":"New user has been regitered Successfully"})
            }
        })
    }catch(err){
        res.send({"msg":"Something went wrong","err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.status(200).send({"msg":"User logged in sucessfull","token":token,"user":user[0].name})
                }else{
                    res.status(400).send({"msg":"No User Found"})
                }
            })
        }else{
            res.send({"msg":"Wrong credentials"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})


module.exports={userRouter}