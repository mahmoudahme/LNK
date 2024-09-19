// models/otpModel.js

// const mailSender = require('../utils/mailSender');
import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 40, // The document will be automatically deleted after 5 minutes of its creation time
  },
});
export default mongoose.model("OTP", otpSchema);