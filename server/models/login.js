const mongoose = require("mongoose")
const logschema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})

const loginuser = mongoose.model("userlogin", logschema)
module.exports = loginuser;