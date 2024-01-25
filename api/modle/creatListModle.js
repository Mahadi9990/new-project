import mongoose from "mongoose";

const listSchema =mongoose.Schema({
    titel:{
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
    sale:{
        type:Boolean,
        required:true
    },
    rent:{
        type:Boolean,
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
    }
},{timestamps:true}
)


const Listing =mongoose.model("listing",listSchema);

export default Listing;