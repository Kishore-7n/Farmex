


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productIds: {
        type: String
    },
    productNames: {
        type: String
    },
    category:{
        type:String
    },
    prices:{
        type: String
    },
    images:{
        type: String
    },
    cartQuantities: {
        type: Number
    },
    paymentStatus: {
        type: String,
        required: true
    }
},{ timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
