import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
})

const User =mongoose.model('user',userSchema);

export default User;