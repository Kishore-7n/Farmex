const express = require("express")
const {newproduct,getsignleuser, getallproducts,deleteproduct,getsingleproduct,getallorders} = require('../controllers/Control')
const checkoutstripe = require("../controllers/stripe")
const webhook = require("../controllers/stripe")


const router = express.Router()



//POST new product
router.post('/sell',newproduct)

//GET all products
router.get('/product',getallproducts)

//GET single product
router.get('/product/:id',getsingleproduct)

//DELETE a product
router.delete('/products/:id', deleteproduct)

//GET single user
router.get('/profile/:userid',getsignleuser)

//Get all orders for admin
router.get('/admin/getorders',getallorders);

//payment for stripe
router.post('/create-checkout-session',checkoutstripe)





module.exports =  router;