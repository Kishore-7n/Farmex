const express = require('express');
const productdetails = require('../models/products');
const cloudinary = require("../utils/cloudinary");
const register = require("../models/register");
const order = require("../models/order");
const app = express()


app.use(express.json());


//creating new products
const newproduct = async(req,res)=>{
    try{
        const { ProducerName,ProducerAddress,ProducerNumber,ProductName,Category,SubCategory,AvailableQuantity,Price,Image,cartquantity} = req.body;
        if(Image)
        {
            const uploadres = await cloudinary.uploader.upload(Image,{
                upload_preset:"ecommerce"
            })
            if(uploadres)
            {
                const product = await new productdetails({
                    ProducerName,
                    ProducerAddress,
                    ProducerNumber,
                    ProductName,
                    Category,
                    SubCategory,
                    AvailableQuantity,
                    Price,
                    Image:uploadres,
                    cartquantity
                });
                await product.save()
                res.status(200).json(product)
                console.log("saved product details"); 
            }
        }
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message})
    }
}

//get all produts
const getallproducts = async(req,res)=>{
    try{
    const product = await productdetails.find().sort({createdAt:-1})
    console.log("Sended all products");
    res.status(200).json(product)
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})

    }
}
//get single product
const getsingleproduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await productdetails.find({_id:id})
        res.status(200).json(product)
        console.log("sended");
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}
// Delete a product
const deleteproduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await productdetails.findByIdAndDelete({_id:id})
        res.status(200).json(product)
        console.log("deleted");
    }
    catch(error){ 
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}

//get single user
const getsignleuser = async(req,res)=>{
    try{
        const {userid} = req.params;
        const currentuser = await register.find({_id:userid});
        const Previous = await order.find({userId:userid});
        res.status(200).json(Previous);
        console.log("orders sent successfully");
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }

}

const getallorders = async(req,res) => {
    try{
        const orders = await order.find();
        res.status(200).json(orders);
        console.log("sent all orders to admin");
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
    }

}


module.exports = {newproduct,getallproducts,getsignleuser,deleteproduct,getsingleproduct,getallorders}