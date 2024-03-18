import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userOuth from './api/route/user.route.js';
import userUpdate from './api/route/userUpdate.js';
import createList from './api/route/createUserList.js';
import newList from './api/route/newList.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
// fasdfa
mongoose.connect(process.env.MONOG_URL).then(()=>{
    console.log("Mongoose server is connect");
}).catch((err)=>{
    console.log(err);
})
const __dirname =path.resolve();

const app =express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/user",userOuth);
app.use("/user/data",userUpdate);
app.use("/user/create",createList);
app.use("/user/new",newList);

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

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












