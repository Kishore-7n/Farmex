const express = require('express')
const registeruser = require('../models/register')
const signinuser = require('../models/login')
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json());

 const  createToken = (verifieduser) =>{
    return(jwt.sign({verifieduser},process.env.SECRET,{expiresIn:'1d'}))
}


//login user 

const loginuser = async(req,res) =>{
    const email = req.body.Email;
    const password = req.body.Password

    try{
        const user = await registeruser.login(email,password)
        const token = createToken(user)
        res.status(200).json({token,user})
        console.log("user logged in successfully");
        
    }catch(error){
        res.status(400).json({error: error.message})
        console.log(error);

    }
}
    



//signup user

const signupuser = async(req,res) =>{
    const name = req.body.Name
    const email = req.body.Email
    const password = req.body.Password
    const address = req.body.Address
    const phonenumber = req.body.PhoneNumber
    const image = req.body.image
    try{
        const user = await registeruser.signup(name,email,password,address,phonenumber,image)
        res.status(200).send();
        console.log("saved and signuped successfully");
    }catch(error){
        res.status(400).json({error: error.message})
        console.log(error);
    }
    
}


module.exports = {loginuser,signupuser}
