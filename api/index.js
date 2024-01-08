import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userOuth from './route/user.route.js';

dotenv.config()

mongoose.connect(process.env.MONOG_URL).then(()=>{
    console.log("Mongoose server is connect")
}).catch((err)=>{
    console.log(err)
})

const app =express()

app.use(express.json());


app.use("/user",userOuth)


app.listen(process.env.SERVER,() =>{
    console.log('srever is running');
})