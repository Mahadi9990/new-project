import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userOuth from './route/user.route.js';
import cors from 'cors';
var corsOptions = {
    origin: process.env.WEBSITE_ULE,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



dotenv.config()

mongoose.connect(process.env.MONOG_URL).then(()=>{
    console.log("Mongoose server is connect")
}).catch((err)=>{
    console.log(err);
})

const app =express();

app.use(cors(corsOptions))


app.use(express.json());

app.use("/user",userOuth);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
});

app.listen(process.env.SERVER,() =>{
    console.log('srever is running');
});

