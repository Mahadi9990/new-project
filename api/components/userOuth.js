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
         const token = jwt.sign({id:validUser._id},process.env.JWT_TOKEN);
         const {password :pass,...rest} =validUser._doc
         res.cookie('access_token',token,{httpOnly:true})
        .status(201)
        .json(rest)
     } catch (error) {
        next(error);
     }
}

export const google =async(req,res,next)=>{
    try {
        const user =await User.findOne({email:req.body.email});
        if(user){
            const token =jwt.sign({id:user._id},process.env.JWT_TOKEN);
            const {password:pass,...rest}=user._doc;
            res.
            cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword=bcryptjs.hashSync(generatedPassword,10)
            const newUser =await User({userName:req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4),email:req.body.email,password:hashPassword,
            avatar:req.body.photo})
            await newUser.save()
            const token =jwt.sign({id:newUser.id},process.env.JWT_TOKEN);
            const {password:pass,...rest} =newUser._doc;
            res.
            cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error);
    }
}

export const singOut =(req,res,next)=>{
    try {
        res.clearCookie("access_token");
        res.status(200).json("User singOut successfully");
    } catch (error) {
        next(error);
    }
}