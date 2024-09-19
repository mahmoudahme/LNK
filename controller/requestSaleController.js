import { configDotenv } from "dotenv";
import commercialRequest from "../model/Sale Request/commercialRequest.js";
import costalRequest from "../model/Sale Request/costalRequest.js";
import residentailRequest from "../model/Sale Request/residentailRequest.js";
import User from "../model/User/User.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

configDotenv({ path: "config/config.env" });

////////////////////////////////////////////CREATING Request/////////////////////////////////////////////////
export const createRequest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const user = await User.findById(req.user.id);
        if (user.activation) {
          if (req.body.typeOfRequest == "residential") {
            const createdRequest = new residentailRequest({
              typeOfRequest: req.body.typeOfRequest,
              location: req.body.location,
              apartment: req.body.apartment,
              title: req.body.title,
              description: req.body.description,
              floor: req.body.floor,
              area: req.body.area,
              rooms: req.body.rooms,
              bathRooms: req.body.bathRooms,
              finishing: req.body.finishing,
              additional: req.body.additional,
              minPrice: req.body.minPrice,
              maxPrice: req.body.maxPrice,
              typeOfPay: req.body.typeOfPay,
              downPayment: req.body.downPayment,
              years: req.body.years,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdRequest.save();
          } else if (req.body.typeOfRequest == "costal") {
            const createdRequest = new costalRequest({
              typeOfRequest: req.body.typeOfRequest,
              location: req.body.location,
              apartment: req.body.apartment,
              title: req.body.title,
              description: req.body.description,
              floor: req.body.floor,
              area: req.body.area,
              rooms: req.body.rooms,
              bathRooms: req.body.bathRooms,
              finishing: req.body.finishing,
              additional: req.body.additional,
              minPrice: req.body.minPrice,
              maxPrice: req.body.maxPrice,
              typeOfPay: req.body.typeOfPay,
              downPayment: req.body.downPayment,
              years: req.body.years,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdRequest.save();
          } else if (req.body.typeOfRequest == "commercial") {
            const createdRequest = new commercialRequest({
              typeOfRequest: req.body.typeOfRequest,
              location: req.body.location,
              apartment: req.body.apartment,
              title: req.body.title,
              description: req.body.description,
              area: req.body.area,
              finishing: req.body.finishing,
              additional: req.body.additional,
              minPrice: req.body.minPrice,
              maxPrice: req.body.maxPrice,
              typeOfPay: req.body.typeOfPay,
              downPayment: req.body.downPayment,
              years: req.body.years,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdRequest.save();
          }
        } else {
          return next(new ApiError(`Your account isn't Activited ! `, 200));
        }
        res.status(200).json({ message: "your list is Created" });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
//////////////////////////////////////////////GET ALL MY Requests //////////////////////////////////////////////
export const getAllMyRequests = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user.typeofUser == "freelancer") {
          const residentailRequests = await residentailRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRequests = await costalRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRequests = await commercialRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentailRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentailRequests: residentailRequests,
            costalRequests: costalRequests,
            commercialRequests: commercialRequests,
          });
        } else if (user.typeofUser == "agency") {
          const residentailRequests = await residentailRequest
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRequests = await costalRequest
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRequests = await commercialRequest
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentailRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentailRequests: residentailRequests,
            costalRequests: costalRequests,
            commercialRequests: commercialRequests,
          });
        } else {
          const residentailRequests = await residentailRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRequests = await costalRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRequests = await commercialRequest
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentailRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRequests.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentailRequests: residentailRequests,
            costalRequests: costalRequests,
            commercialRequests: commercialRequests,
          });
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
/////////////////////////////////////GET ALL Request////////////////////////////////////////////////////////
export const getAllRequests = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const residentailRequests = await residentailRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalRequests = await costalRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const commercialRequests = await commercialRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Listing = residentailRequests.concat(costalRequests);
        let AllListtings = Listing.concat(commercialRequests);
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        let AllListing = shuffleArray(AllListtings);
        AllListing.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });

        for (var i = 0; i < AllListing.length; i++) {
          if (AllListing[i].typeOfRequest == "residential") {
            await residentailRequest.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view+1,
            } ,{ new: true });
          } else if (AllListing[i].typeOfRequest == "commercial") {
            await commercialRequest.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view+1,
            }, { new: true });
          } else if (AllListing[i].typeOfRequest == "costal") {
            await costalRequest.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view+1,
            },{ new: true });
          }
        }

        res.status(200).json({ Requests: AllListing });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
/////////////////////////////////////UPDATE Request////////////////////////////////////////////////////////
export const updateRequests = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentailRequest.findById(listId);
        const costal = await costalRequest.findById(listId);
        const commercial = await commercialRequest.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            const newRequest = await residentailRequest
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: newRequest });
          } else {
            return next(new ApiError(`You Can't Update This Request `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            const newRequest = await costalRequest
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: newRequest });
          } else {
            return next(new ApiError(`You Can't Update This Request `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            const newRequest = await commercialRequest
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: newRequest });
          } else {
            return next(new ApiError(`You Can't Update This Request `, 400));
          }
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////GET ONE Request FROM MY Requests////////////////////////////////////////////////////////
export const oneRequestFromMyRequests= async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const requestId = req.params.requestId;
        const residentail = await residentailRequest.findById(requestId);
        const costal = await costalRequest.findById(requestId);
        const commercial = await commercialRequest.findById(requestId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            const oneRequest = await residentailRequest
              .find({ _id: requestId })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: oneRequest });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This Request As Owner`, 404)
            );
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            const oneRequest = await costalRequest
              .find({ _id: requestId })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: oneRequest });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This Request As Owner`, 404)
            );
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            const oneRequest = await commercialRequest
              .find({ _id: requestId })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: oneRequest });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This Request As Owner`, 404)
            );
          }
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
//////////////////////////////////////DELETE Request////////////////////////////////////////////////////////
export const deleteRequest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const requestId = req.params.id;
        const residentail = await residentialList.findById(requestId);
        const costal = await costalList.findById(requestId);
        const commercial = await commercialList.findById(requestId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            await residentailRequest.findByIdAndDelete(requestId);
            res.status(200).json({ Message: " Your Request is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This Request `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            await costalRequest.findByIdAndDelete(requestId);
            res.status(200).json({ Message: " Your Request is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This Request `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            await commercialRequest.findByIdAndDelete(requestId);
            res.status(200).json({ Message: " Your Request is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This Request `, 400));
          }
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
//////////////////////////////////////GET LIST FROM OUT LISTING ////////////////////////////////////////////
export const getRequestFromOut = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const requestId = req.params.requestId;
        const residentail = await residentailRequest.findById(requestId);
        const costal = await costalRequest.findById(requestId);
        const commercial = await commercialRequest.findById(requestId);
        if (residentail) {
          const oneRequest = await residentailRequest
            .find({ _id: requestId })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await residentailRequest.findByIdAndUpdate(
            oneRequest[0].id,
            {
              click: (oneRequest[0].click += 1),
            },
            { new: true }
          );
          // console.log(oneListUp.click)
          res.status(200).json({ Request: oneRequest });
        } else if (costal) {
          const oneRequest = await costalRequest
            .find({ _id: requestId })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await costalRequest.findByIdAndUpdate(
            oneRequest[0].id,
            {
              click: (oneRequest[0].click += 1),
            },
            { new: true }
          );
          res.status(200).json({ Request: oneRequest });
        } else if (commercial) {
          const oneRequest = await commercialRequest
            .find({ _id: requestId })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await commercialRequest.findByIdAndUpdate(
            oneRequest[0].id,
            {
              click: (oneRequest[0].click += 1),
            },
            { new: true }
          );
          res.status(200).json({ Request: oneRequest });
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////////////// ////////only costalRequest/////////////////////////////////////////////////////
export const getAllcostalRequest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const costalRequests = await costalRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        // const costalRents = await costalRent
        //   .find()
        //   .populate({ path: "userId", select: "name-_id" })
        //   .populate({ path: "AgencyId", select: "name-_id" });

        // let Listing = costalLists.concat(costalRents);
        // function shuffleArray(array) {
        //   for (let i = array.length - 1; i > 0; i--) {
        //     let j = Math.floor(Math.random() * (i + 1));
        //     [array[i], array[j]] = [array[j], array[i]];
        //   }
        //   return array;
        // }
        // let Listings = shuffleArray(Listing);

        costalRequests.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });
        for (var i = 0; i < costalRequests.length; i++) {
          await costalRequest.findByIdAndUpdate(costalRequests[i].id, {
            view: costalRequests[i].view + 1,
          });
          // await costalRent.findByIdAndUpdate(Listings[i].id, {
          //   view: Listings[i].view + 1,
          // });
        }

        res.status(200).json({ All: costalRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////////////////////only residentialLists/////////////////////////////////////////////////
export const getAllresidentails = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const residentailRequests = await residentailRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        // const residentialRents = await residentialRent
        //   .find()
        //   .populate({ path: "userId", select: "name-_id" })
        //   .populate({ path: "AgencyId", select: "name-_id" });

        // let Listing = residentialLists.concat(residentialRents);

        // function shuffleArray(array) {
        //   for (let i = array.length - 1; i > 0; i--) {
        //     let j = Math.floor(Math.random() * (i + 1));
        //     [array[i], array[j]] = [array[j], array[i]];
        //   }
        //   return array;
        // }
        // let Listings = shuffleArray(Listing);

        residentailRequests.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });

        for (var i = 0; i < residentailRequests.length; i++) {
          await residentailRequest.findByIdAndUpdate(residentailRequests[i].id, {
            view: residentailRequests[i].view + 1,
          });
          // await residentialRent.findByIdAndUpdate(Listings[i].id, {
          //   view: Listings[i].view + 1,
          // });
        }
        res.status(200).json({ All: residentailRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////////////////////only commercialList/////////////////////////////////////////////////
export const getAllcommercial = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const commercialRequests = await commercialRequest
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        // const commercialRents = await commercialRent
        //   .find()
        //   .populate({ path: "userId", select: "name-_id" })
        //   .populate({ path: "AgencyId", select: "name-_id" });

        // let Listing = commercialLists.concat(commercialRents);

        // function shuffleArray(array) {
        //   for (let i = array.length - 1; i > 0; i--) {
        //     let j = Math.floor(Math.random() * (i + 1));
        //     [array[i], array[j]] = [array[j], array[i]];
        //   }
        //   return array;
        // }

        // let Listings = shuffleArray(Listing);
        commercialRequests.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });
        for (var i = 0; i < commercialRequests.length; i++) {
          await commercialRequest.findByIdAndUpdate(commercialRequests[i].id, {
            view: commercialRequests[i].view + 1,
          });
          // await commercialRent.findByIdAndUpdate(Listings[i].id, {
          //   view: Listings[i].view + 1,
          // });
        }
        res.status(200).json({ All: commercialRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};