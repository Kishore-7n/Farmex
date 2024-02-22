
const express = require("express")
const {loginuser , signupuser} = require('../controllers/usercontroller')
const router = express.Router()

//login route 

router.post('/login',loginuser)


//register route

router.post('/signup',signupuser)

module.exports = router