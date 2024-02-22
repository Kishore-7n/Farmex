require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyparser = require("body-parser")
const routecontrollers = require('./routes/routes')
const usercontrollers = require('./routes/userroutes')
const app = express()



//middlewares

app.use(cors())

app.use(express.json({limit:'100mb'})); 

app.use(bodyparser.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



//routes
app.post('/signup',usercontrollers)

app.post('/login', usercontrollers)

app.post('/sell',routecontrollers)

app.post('/create-checkout-session',routecontrollers)
 
app.get("/profile/:userid",routecontrollers)

app.get("/admin/getorders",routecontrollers)

app.get('/product',routecontrollers)

app.get('/product/:id',routecontrollers)

app.delete('/products/:id',routecontrollers)



// connection to db 
mongoose.connect(process.env.MONGOURL ,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to DB")
})
.catch((err) =>{
    console.log(err);
}); 


// listening to the port
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Server started at the port",process.env.PORT);
    }
})
