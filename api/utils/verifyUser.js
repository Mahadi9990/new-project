import { errorHandeler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken =(req,res,next) =>{
  const token =req.cookies.access_token;
  if(!token) return next(errorHandeler(403,'unauthorize')) 

  jwt.verify(token,process.env.JWT_TOKEN,(err,user) =>{
    if(err) return next(errorHandeler(402,"Forbiden"))
    req.user =user
    next()
  })
};