import express from "express";
import {
    createRequest,
    getAllMyRequests,
    getAllRequests ,
    updateRequests ,
    oneRequestFromMyRequests,
    deleteRequest
} 
from "../controller/requestSaleController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.post("/", createRequest)
router.get("/" ,getAllRequests)
router.get("/:id", getAllMyRequests)
router.get("/:id/:requestId", oneRequestFromMyRequests)
router.put("/:id", updateRequests)
router.delete("/:id", deleteRequest)

export default router