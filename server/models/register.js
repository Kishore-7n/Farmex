
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const cloudinary = require('../utils/cloudinary')
const regschema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    }  ,
    Address:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        type:Number,
        required:true,
    },
     image:{
         type:Object,
         required:true,
     },
},{timestamps:true}
);




//static signup method

regschema.statics.signup = async function signup(name,email,password,address,phonenumber,image){

    const exists = await this.findOne({Email:email})

    if(exists){

        throw Error("Email already exists")
    }
    //validation

    if(!email || !password)
    {
        throw Error("All field must be filled")
    }
    if(!validator.isEmail((email))){
        throw Error("Email must be Valid")
    }
    // if(!validator.isStrongPassword((password)))
    // {
    //     throw Error("Password must be Strong")
    // }

    if(image)
    {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password,salt)

    const uploadres = await cloudinary.uploader.upload(image,{
        upload_preset:"ecommerce"
    })

    const user = await this.create({Name:name,Email:email,Password:hash,Address:address,PhoneNumber:phonenumber,image:uploadres})

    return user
}

}

//static login method

regschema.statics.login = async function login(email,password)
{

    //validation

    if(!email || !password)
    {
        throw Error("All field must be filled")
    }

    const user = await this.findOne({Email:email})

    if(!user){

        return Error("Incorrect Email")
    }
    const match = await bcrypt.compare(password,user.Password)

    if(!match)
    {
        return Error("Incorrect Password")
    }

    return user


}






const registeruser = mongoose.model("register", regschema)
module.exports = registeruser;