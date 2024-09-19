import express from "express";
import {
  createRent,
  deleteListing,
  getAllListing,
  getAllMyListing,
  oneListFromMyListing,
  updateListing
} 
from "../controller/rentController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.post("/", createRent)
router.get("/" ,getAllListing)
router.get("/:id", getAllMyListing)
router.get("/:id/:listid", oneListFromMyListing)
router.put("/:id", updateListing)
router.delete("/:id", deleteListing)

export default router