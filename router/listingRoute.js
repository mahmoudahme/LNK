import express from "express";
import {
    createlisting,
    getAllMyListing,
    getAllListing,
    updateListing,
    deleteListing,
    oneListFromMyListing,
    getAllcostalList
} 
from "../controller/listingController.js";
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.post("/", createlisting)
router.get("/" ,getAllListing)
router.get("/:id", getAllMyListing)
router.get("/:id/:listid", oneListFromMyListing)
router.put("/:id", updateListing)
router.delete("/:id", deleteListing)

export default router