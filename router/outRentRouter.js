import express from "express";
import {
    getListFromOut
} 
from "../controller/rentController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/:listid" ,getListFromOut)


export default router