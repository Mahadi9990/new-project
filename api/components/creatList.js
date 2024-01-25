import Listing from "../modle/creatListModle.js"

export const list =async(req,res,next)=>{
    try {
        const creatListing = await Listing.create(req.body)
        return res.status(201).json(creatListing);
    } catch (error) {
       next(error); 
    }
}