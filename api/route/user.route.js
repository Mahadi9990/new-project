import express from "express";
import { singUp,singIn } from "../components/userOuth.js";

const route =express.Router()

route.post('/sing-up',singUp)
route.post('/sing-in',singIn)


export default route;
