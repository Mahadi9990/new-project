import mongoose from "mongoose";

const listSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    textArea:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    market:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    userRef:{
        type:String,
        required:true
    },
    bathroom:{
        type:Number,
        require:true
    },
    badroom:{
        type:Number,
        require:true
    }
},{timestamps:true}
)


const Listing =mongoose.model("listing",listSchema);

export default Listing;