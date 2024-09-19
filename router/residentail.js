import express from "express";
import {
    getAllresidentails
} 
from "../controller/listingController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/" ,getAllresidentails)


export default router