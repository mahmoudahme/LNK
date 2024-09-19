import express from "express";
import {
    getrequestFromOut
} 
from "../controller/requestRentController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/:requestid" ,getrequestFromOut)


export default router