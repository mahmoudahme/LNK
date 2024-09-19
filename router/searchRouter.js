import express from "express";
import {
    filteration,
    filterationRent,
    filterationRentRequest,
    filterationRequest
}
from "../controller/searchController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();
router.get("/sale" ,filteration)
router.get("/rent" ,filterationRent)
router.get("/request" ,filterationRequest)
router.get("/requestRent" ,filterationRentRequest)
export default router