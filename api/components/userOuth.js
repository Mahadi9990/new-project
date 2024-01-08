import User from "../modle/user.modle.js";
import bcryptjs from "bcryptjs"


export const singIn = async(req,res) =>{
    const {userName,password,email} =req.body;
    const hashPassword =bcryptjs.hashSync(password,10);
    const newUser = new User({userName,password:hashPassword,email})
    try {
        await newUser.save();
    res.status(201).json("user Create sussfully")
    } catch (error) {
       res.status(500).json(error.message) 
    }
}