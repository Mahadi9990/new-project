import express from "express";
import { updateUser,deletUser} from "../components/update.js";
import {verifyToken} from '../utils/verifyUser.js'

const router =express.Router();

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deletUser)
router.delete('/logOut/:id',verifyToken,deletUser)


export default router;