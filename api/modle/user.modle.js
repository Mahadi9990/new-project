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
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1hgvnIMlLB3PPGNSPEUJ54&ust=1705218109293000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIDWpM_u2YMDFQAAAAAdAAAAABAE"
    }
})

const User =mongoose.model('user',userSchema);

export default User;