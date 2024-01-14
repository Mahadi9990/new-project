import express from "express";
import { singUp,singIn,google} from "../components/userOuth.js";

const route =express.Router()

route.post('/sing-up',singUp)
route.post('/sing-in',singIn)
route.post('/google',google)




export default route;
