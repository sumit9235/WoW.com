const express= require('express')
const productRouter=express.Router()
const {ProductModel}=require("../model/products.model")

productRouter.get("/",async(req,res)=>{
    try{
        const data=await ProductModel.find()
        res.send(data)
    }catch(err){
        res.send(err.message)
    }
})

productRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const name=req.body.name
    try{
         const data = await ProductModel.findOne({name:name})
         if(data){
            res.send({"msg":"Product available already"})
        }else{
        const product=new ProductModel(payload)
        await product.save()
        res.send({"msg":"New product has been registered"})
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

productRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await ProductModel.findByIdAndDelete({_id:id})
        res.send({"msg":`Products with this id:${id} has been deleted`})
    }catch(err){
        res.send({"msg":"Error deleting products"})
    }
})

productRouter.patch("/patch/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        await ProductModel.findByIdAndUpdate({_id:id},data)
        res.send({"msg":`Products with this id:${id} has been Updated`})
    }catch(err){
        res.send({"msg":"Error updating products"})
    }
})


module.exports={productRouter}