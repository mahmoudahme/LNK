import express from "express";
import {
    getAllcommercial
} 
from "../controller/requestSaleController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/" ,getAllcommercial)


export default router