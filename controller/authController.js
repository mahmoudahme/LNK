import bcrypt from "bcrypt";
import { ApiError } from "../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../model/User/User.js";
// import subAccount from '../model/User/subAccounts.js'
import Logger from "../Services/logger.js";
const logger = new Logger("AuthControllers");
import dotenv from "dotenv";
import OTP from "../model/User/OTP.js";
import { mailSender } from "../Utils/mailSender.js";
dotenv.config({ path: "config/config.env" });
import Randomstring from "randomstring";


///////////////////////////////////REGISTER TO SYSTEM ////////////////////////////////////////////////
function generateOTP() {
  return Randomstring.generate({
    length: 4,
    charset: "numeric",
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
      subject: "Verification Email",
      message: `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const existingOTP = await OTP.findOneAndDelete({ email, otp });

    if (existingOTP) {
      // OTP is valid
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const register = async (req, res, next) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      typeofUser: req.body.typeofUser,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      city: req.body.city,
      address: req.body.address,
      UserId: req.body.UserId,
    });
    await newUser.save();
    res.status(200).json({ message: "New User Created", userdata: newUser });
  } catch (error) {
    logger.error("There is error", error);
    return next(new ApiError(`System Error ${error}`, 404));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.body.phone }).populate({
      path: "UserId",
      select: "name-_id",
    });
    if (!user) {
      return next(new ApiError("User not found!", 404));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(new ApiError("password isn't correct", 422));
    }
    if (user.approve) {
      const token = JsonWebToken.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
      const { password, isAdmin, ...otherDetails } = user._doc;
      logger.info("User LogIn");
      res
        .cookie("accessToken", token, {
          httpOnly: false,
          secure: true,
          sameSite: "Strict",
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin, token: token });
    } else {
      return next(new ApiError("You aren't approved yet", 400));
    }
  } catch (error) {
    logger.error("There is error", error);
    return next(new ApiError(`System Error ${error}`, 404));
  }
};

// Middleware to check if the token is valid and to log out the user
export const logout = async (req, res, next) => {
  try {
    // Clear the token from the cookies
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
///////////////////////////////////////////////////////////////
export const forgetPassword = async(req , res , next)=>{
  try{
    const {phone ,password} = req.body ;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userAccount = await User.findOne({phone : phone});
    const newDateforUser = await User.findByIdAndUpdate(userAccount.id , {password : hashedPassword});
    res.status(200).json({Message: "Your Passwprd is Updated" , UserData : newDateforUser})
  }catch(error){
    next(new ApiError("System Error" , 404))
  }
}