import express from "express";
import {
    getAllcostalRequest
} 
from "../controller/requestSaleController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/" ,getAllcostalRequest)


export default router