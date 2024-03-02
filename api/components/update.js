import { errorHandeler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../modle/user.modle.js';
import Listing from "../modle/creatListModle.js";

export const updateUser = async(req,res,next) =>{
   if(req.user.id !== req.params.id) return next(errorHandeler(401,"you hava to authanticatit"))
   try {
    if(req.body.password){
        req.body.password =bcryptjs.hashSync(req.body.password,10);
    }
    const updateUser =await User.findByIdAndUpdate(req.params.id,{
        $set:{
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }
    },{new:true})
    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest);

   } catch (error) {
    next(error)
   }
}
export const deletUser= async(req,res,next) =>{
    if(req.user.id !== req.params.id) return next(errorHandeler(404,"You can delet your own account"))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json('User Delete successfully');
    } catch (error) {
        next(error);
    }
} 


export const getUserListing =async(req,res,next) =>{
    if(req.user.id === req.params.id){
        try {
            const listings =await Listing.find({userRef: req.params.id})
            res.status(201).json(listings);
        } catch (error) {
            console.log(error);
        }
    }else{
        return next(errorHandeler(401,'you can see your own list'))
    }
}

export const landLoar =async(req,res,next)=>{
    try {
        const user =await User.findById(req.params.id);
        if(!user) return next(errorHandeler(400,'user not found'));
        const {password:pass ,...rest} =user._doc;
        res.status(200).json(rest);
    } catch (error) {
      next(error)  
    }
}