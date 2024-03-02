import Listing from "../modle/creatListModle.js"
import { errorHandeler } from "../utils/error.js";

export const list =async(req,res,next)=>{
    try {
        const creatListing = await Listing.create(req.body)
        return res.status(201).json(creatListing);
    } catch (error) {
       next(error); 
    }
}

export const deleteList =async(req,res,next)=>{
    const listings =await Listing.findById(req.params.id);
    if(!listings) return next(errorHandeler(401,"List is not found"));
    if(req.user.id !== listings.userRef)return next(errorHandeler(403,"you can delete your own list"))
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(201).json("list has been delete");
    } catch (error) {
        next(error);
    }
}

export const updateUserList= async(req,res,next)=>{
    const listings =await Listing.findById(req.params.id)
    if(!listings) return next(errorHandeler(401,"List is not found"))
    if(req.user.id !== listings.userRef) return next(errorHandeler(403,"You can update your own list"))
    try {
        const userlistUpdate =await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
             new:true
            }
        )
        res.status(201).json(userlistUpdate)

    } catch (error) {
        next(error)
    }
}

export const getLists = async(req,res,next)=>{
    try {
        const listing =await Listing.findById(req.params.id);
        if(!listing) return next(errorHandeler(404,'Listing is not found'));
        res.status(200).json(listing);
    } catch (error) {
       next(error); 
    }
}


export const getUserLists =async(req,res,next)=>{
   try {
    
const limit =parseInt(req.query.limit) || 9;
const startIndex =parseInt(req.query.startIndex) || 0;
let offer = req.query.offer;
if( offer === undefined || offer === 'false'){
 offer = {$in :[false,true]}
}
let furnished = req.query.furnished;
if(furnished === undefined || furnished === 'false'){
 furnished = {$in :[false,true]}
} 
let parking = req.query.parking;
if( parking === undefined || parking === 'false')
{
 parking = { $in :[false,true]}
}
let type = req.query.type;
if( type === undefined || type === 'all')
{
 type = { $in :['sale','rent']}
}
const searchTrams =req.query.searchTrams || ''
const sort =req.query.sort || 'createdAt';
const order =req.query.order || 'desc';

const listings =await Listing.find({
    title: { $regex :searchTrams ,$options:"i"},
    offer,
    furnished,
    parking,
    type,
   }).sort({[sort]:order}).limit(limit).skip(startIndex);
   return res.status(200).json(listings)

   } catch (error) {
    next(error);
   }
}
