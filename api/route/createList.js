import  express  from "express";
import { list , deleteList } from '../components/creatList.js'
import { verifyToken } from "../utils/verifyUser.js";
import { getUserListing } from "../components/update.js";

const route =express();

route.post('/listing',verifyToken, list);
route.get('/listing/:id',verifyToken,getUserListing)
route.delete('/delete/:id',verifyToken,deleteList)

export default route;
