import mongoose from "mongoose";
const commercialRequestRent = new mongoose.Schema(
  {
    typeOfRequest: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    finishing: {
      type: String,
      required: true,
    },
    additional: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    advanceRent: {
      type: String,
      required: true,
    },
    insurance: {
      type: Number,
    },
    typeOfPublish: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    click: {
      type: Number,
      default: 0,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    AgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("commercialRequestRent", commercialRequestRent);
