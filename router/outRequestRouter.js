import express from "express";
import {
    getRequestFromOut
} 
from "../controller/requestSaleController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/:requestId" , getRequestFromOut)


export default router