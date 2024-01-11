import User from "../modle/user.modle.js";
import bcryptjs from "bcryptjs"
import { errorHandeler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const singUp = async(req,res,next) =>{
    const {userName,password,email} =req.body;
    const hashPassword =bcryptjs.hashSync(password,10);
    const newUser = new User({userName,password:hashPassword,email})
    try {
        await newUser.save();
    res.status(201).json("user Create sussfully")
    } catch (error) {
       next(error)
    }
}

export const singIn =async (req,res,next) =>{
    try {
        const {email,password} =req.body;
        const validUser =await User.findOne({email:email});
         if(!validUser) return next(errorHandeler(404,'user is not found'));
         const validPassword = bcryptjs.compareSync(password,validUser.password);
         if(!validPassword) return next(errorHandeler(401,'wrong credential'));
         const token = jwt.sign({id:validUser._id},process.env.JWTTOKEN);
        res.cookie('access_token',token,{httpOnly:true})
        .status(201)
        .json(validUser)
     } catch (error) {
        next(error);
     }
}