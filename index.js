const express=require('express')
const mongoose=require('mongoose')
const productRouter=require('./router')
require('dotenv').config()
const app=express()


app.use(express.json())
app.use('/api',productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log('server in running on the port '+ PORT))

const CONNECTION_URL=process.env.MONGO_URL



mongoose.connect(CONNECTION_URL)
   .then(()=> console.log("database connected"))
   .catch((error)=> console.log(error.message))

mongoose.set('strictQuery', true)