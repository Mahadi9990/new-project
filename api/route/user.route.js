import express from "express";
import { singIn } from "../components/userOuth.js";

const route =express.Router()

route.post('/outh',singIn)

export default route;
