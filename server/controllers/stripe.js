require("dotenv").config()
const express = require("express");
const Order = require("../models/order");
const User = require("../models/register");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());




const YOUR_DOMAIN = 'https://farmex-wq44.onrender.com';

const checkoutstripe = async(req,res) => {

    try{
        const line_items = req.body.cartitems.map((item) => {
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.ProductName,
                        images:[item.Image.url],
                    },
                    unit_amount : item.Price*100,
                },
                quantity:item.cartquantity,
            }
        })


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cart`,
        });
        res.send({url:session.url});



        const cartItems = req.body.cartitems;
        const orderItems = cartItems.map(item => ({
            productIds: item._id,
            prices: item.Price,
            images: item.Image.url,
            productNames: item.ProductName,
            category:item.Category,
            cartQuantities: item.cartquantity
}));

const orderInstances = orderItems.map(orderItem => new Order({
    userId: req.body.userid,
    ...orderItem,
    paymentStatus: "completed"
}));

await Order.insertMany(orderInstances);
console.log("Orders created successfully");


//whatsapp

setTimeout(async()=>{



const accountSid = process.env.TWILIOSID;
const authToken = process.env.TWILIOAUTHTOKEN;
const userId = req.body.userid;
const messageuser  = await User.findById(userId);
console.log(messageuser.PhoneNumber);

const itemsPurchased =  cartItems.map(item => `${item.ProductName}`).join(',');


const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: `Hello from Farmex! 🌾
    Thank you for choosing Farmex, your direct link to fresh farm products! Here's the status of your recent purchase:

    Order Details:
    Items Purchased:${itemsPurchased}
    Payment Status: Payment Received ✅
    Shipping ETA: Your order will be shipped within 2 business days.

    For any questions or updates, feel free to reach out.
    Happy farming! 🚜🍅🥚
    Best regards,
    The Farmex Team 🌱`,
    from:'whatsapp:+14155238886',
    to: `whatsapp:+91${messageuser.PhoneNumber}`,
    
  })
 .then((message) => console.log(message.sid));
}
,10000)

}
catch(error){
    console.log(error);
    res.status(400).json({error:error.message})
}
}   










module.exports = checkoutstripe;