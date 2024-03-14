import  express  from "express";
import { getUserLists } from '../components/newList.js'


const route =express()

route.get('/get',getUserLists)

export default route;
