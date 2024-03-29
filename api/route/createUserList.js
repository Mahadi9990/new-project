import  express  from "express";
import { list,deleteList,updateUserList,getLists } from '../components/creatList.js'
import { verifyToken } from "../utils/verifyUser.js";
import { getUserListing ,landLoar} from "../components/update.js";

const route =express()

route.post('/listing' ,verifyToken,list)
route.get('/listing/:id' ,verifyToken,getUserListing)
route.delete('/delete/:id',verifyToken,deleteList)
route.post('/update/:id',verifyToken,updateUserList)
route.get('/get/:id',getLists)
route.get('/:id',verifyToken,landLoar)

export default route;

