import express from "express";
import {
    getAllcostalList
} 
from "../controller/listingController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/" ,getAllcostalList)


export default router