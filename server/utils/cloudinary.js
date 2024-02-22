require("dotenv").config();

const cloudinarymodule = require("cloudinary");

const cloudinary = cloudinarymodule.v2

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET,
})

module.exports =  cloudinary;