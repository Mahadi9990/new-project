import  express  from "express";
import { list } from '../components/creatList.js'
import { verifyToken } from "../utils/verifyUser.js";

const route =express();

route.post('/listing',verifyToken, list);

export default route;