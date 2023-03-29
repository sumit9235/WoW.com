const mongoose=require("mongoose")
const productsSchema=mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    category:String
},{
    versionKey:false
})
const ProductModel=mongoose.model('product',productsSchema)

module.exports={ProductModel}