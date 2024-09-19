import express from "express";
import {
  createRent , 
  getAllMyrequesting ,
  getAllrequesting , 
  oneRequestFromMyrequesting ,
  updaterequesting , 
  deleterequesting 
} 
from "../controller/requestRentController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.post("/", createRent)
router.get("/" ,getAllrequesting)
router.get("/:id", getAllMyrequesting)
router.get("/:id/:requestid", oneRequestFromMyrequesting)
router.put("/:id", updaterequesting)
router.delete("/:id", deleterequesting)

export default router