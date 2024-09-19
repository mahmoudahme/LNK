import express from "express";
import {
    AllListingAndRents
} 
from "../controller/listingController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.get("/" ,AllListingAndRents)


export default router