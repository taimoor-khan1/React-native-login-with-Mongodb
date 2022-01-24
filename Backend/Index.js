const express = require('express')
const bodyParser =require('body-parser')
const mongoose = require('mongoose')

const app = express()

const PORT =3000
const  {magoUrl}=require('./keys')


require('./Models/User');
const requiretoken=require('./Middleware/requiretoken')
const authRoutes=require('./Route/authRoutes')
const req = require('express/lib/request')
app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(magoUrl,{
    //userNewUrlParser:true ,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mango ")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error ",err)
})
app.get('/',requiretoken,(req,res)=>{
    res.send("your email is "+req.user.email)
})
app.listen(PORT,()=>
{
    console.log("server runing",+PORT)
})
