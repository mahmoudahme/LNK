import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    typeofUser:{
      type : String ,
      required  :true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String, 
      unique: true,
    },
    phone :{
      type : String ,
      required : true 
    },
    password: { 
      type: String,
      required: true,
    },
    city :{
      type: String,
      required: true,
    },
    address:{
      type : String,
    },
    place :{
      type: Array 
    },
    approve : {
      type : Boolean ,
      default : false 
    } ,
    activation : {
      type : Boolean ,
      default : false 
    }, 
    credits :{
      type : Number ,
      default : 0 
    },
    UserId : {
      type :mongoose.Schema.Types.ObjectId ,
      ref : "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
