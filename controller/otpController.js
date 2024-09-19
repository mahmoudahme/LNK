// controllers/otpController.js
import OTP from '../model/User/OTP.js';
import Randomstring from 'randomstring';
import User from "../model/User/User.js"
import {mailSender} from "../Utils/mailSender.js"

function generateOTP() {
  return Randomstring.generate({
      length:4,
      charset: 'numeric'
  });
}
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
        const otp = generateOTP(); // Generate a 6-digit OTP
        const newOTP = new OTP({ email, otp });
        await newOTP.save();

        // Send OTP via email
        await mailSender({
            to: email,
            subject: 'Your OTP',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
      const { email, otp } = req.body;
      const existingOTP = await OTP.findOneAndDelete({ email, otp });

      if (existingOTP) {
          // OTP is valid
          res.status(200).json({ success: true, message: 'OTP verification successful' });
      } else {
          // OTP is invalid
          res.status(400).json({ success: false, error: 'Invalid OTP' });
      }
  } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
};