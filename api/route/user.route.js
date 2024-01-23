import express from "express";
import { singUp,singIn,google,singOut} from "../components/userOuth.js";

const route =express.Router()

route.post('/sing-up',singUp)
route.post('/sing-in',singIn)
route.post('/google',google)
route.get('/singOut',singOut)





export default route;
