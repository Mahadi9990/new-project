import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()



mongoose.connect(process.env.MONOG_URL).then(()=>{
    console.log("Mongoose server is connect")
}).catch((err)=>{
    console.log(err)
})

const app =express()

app.get("/",(req,res)=>{
    res.send("Hellow")
})

app.listen(3000,() =>{
    console.log('srever is running');
})