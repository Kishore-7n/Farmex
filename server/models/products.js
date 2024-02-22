const mongoose = require("mongoose")

const productschema = mongoose.Schema({
    ProducerName:{
        type:String,
        required:true
        
        
    },
    ProducerAddress:{
        type:String,
        required:true
        
        
    },
    ProducerNumber:{
        type:Number,
        required:true
        
        
    },
    ProductName:{
        type:String,
        required:true
        
    },
    Category:{
        type:String,
        required:true
        
        
    },
    SubCategory:{
        type:String,
        required:true
        
        
    },
    AvailableQuantity:{
        type:String,
        required:true
        
        
    },
    Price:{
        type:Number,
        required:true
        
        
    },
    Image:{
        type:Object,
        required:true
        
    },
    cartquantity:{
        type:Number
    },

})


const productdetails = mongoose.model("productdetails",productschema)

module.exports = productdetails;