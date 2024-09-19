import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { DBConnection } from "./config/DbConnection.js";
import { globalError } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRouter.js";
import listingRouter from "./router/listingRoute.js";
import RentRouter from "./router/RentRouter.js";
import userRouter from "./router/userRouter.js";
import otpRouter from "./router/otpRouter.js";
import outRouter from "./router/outRouter.js";
import outRentRouter from "./router/outRentRouter.js";
import outRentRequestRouter from "./router/outRentRequestRouter.js";
import costalRouter from "./router/costalRouter.js";
import costalRequestRouter from "./router/costalRequestRouter.js";
import resisentailRequestRouter from "./router/resisentailRequestRouter.js";
import residentailRouter from "./router/residentail.js";
import commercialRouter from "./router/commercial.js";
import commercailRequestRouter from "./router/commercailRequestRouter.js";
import searchRouter from "./router/searchRouter.js";
import SaleAndRent from "./router/SaleAndRent.js";
import RequestRouter from "./router/RequestRouter.js";
import outRequestRouter from "./router/outRequestRouter.js";
import RentRequestRouter from "./router/RentRequestRouter.js"

configDotenv({ path: "config/config.env" });
const app = express();
DBConnection();
const PORT = process.env.PORT || 2000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log("Mode : Development");
}

app.use("/api/auth", authRouter);
app.use("/api/list", listingRouter);
app.use("/api/request", RequestRouter);
app.use("/api/requestRent", RentRequestRouter);
app.use("/api/rent", RentRouter);
app.use("/api/out/", outRouter);
app.use("/api/outRent/", outRentRouter);
app.use("/api/outRequest/", outRequestRouter);
app.use("/api/outRentRequest/", outRentRequestRouter);
app.use("/api/saleAndRent/", SaleAndRent);
app.use("/api/costal", costalRouter);
app.use("/api/costalRequest", costalRequestRouter);
app.use("/api/residentail", residentailRouter);
app.use("/api/residentailRequest", resisentailRequestRouter);
app.use("/api/commercialRequest", commercailRequestRouter);
app.use("/api/commercial", commercialRouter);
app.use("/api/filter", searchRouter);
app.use("/api/user", userRouter);
app.use("/api", otpRouter);

//global error Middleware
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
