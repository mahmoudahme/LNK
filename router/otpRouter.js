// const express = require('express');
// const otpController = require('../controllers/otpController');
import express from "express"
import { sendOTP ,verifyOTP } from "../controller/otpController.js";

const router = express.Router();
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

export default router;