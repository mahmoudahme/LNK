import { configDotenv } from "dotenv";
import commercialRent from "../model/Rent/commercialRent.js";
import costalRent from "../model/Rent/costalRent.js";
import residentialRent from "../model/Rent/residentialRent.js";
import User from "../model/User/User.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

configDotenv({ path: "config/config.env" });
////////////////////////////////////////////CREATING Rent/////////////////////////////////////////////////
export const createRent = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const user = await User.findById(req.user.id);
        if (user.activation) {
          if (req.body.typeOfList == "residential") {
            const createdListing = new residentialRent({
              typeOfList: req.body.typeOfList,
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
              typeOfRent: req.body.typeOfRent,
              price: req.body.price,
              advanceRent: req.body.advanceRent,
              insurance: req.body.insurance,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdListing.save();
          } else if (req.body.typeOfList == "costal") {
            const createdListing = new costalRent({
              typeOfList: req.body.typeOfList,
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
              typeOfRent: req.body.typeOfRent,
              price: req.body.price,
              advanceRent: req.body.advanceRent,
              insurance: req.body.insurance,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdListing.save();
          } else if (req.body.typeOfList == "commercial") {
            const createdListing = new commercialRent({
              typeOfList: req.body.typeOfList,
              location: req.body.location,
              apartment: req.body.apartment,
              title: req.body.title,
              description: req.body.description,
              area: req.body.area,
              finishing: req.body.finishing,
              additional: req.body.additional,
              price: req.body.price,
              advanceRent: req.body.advanceRent,
              insurance: req.body.insurance,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdListing.save();
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
/////////////////////////////////////GET ALL LISTING////////////////////////////////////////////////////////
export const getAllListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const residentialRents = await residentialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalRents = await costalRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const commercialRents = await commercialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Rents = residentialRents.concat(costalRents);
        let AllRents = Rents.concat(commercialRents);
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        let AllRent = shuffleArray(AllRents);
        AllRent.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });

        for (var i = 0; i < AllRent.length; i++) {
          if (AllRent[i].typeOfList == "residential") {
            await residentialRent.findByIdAndUpdate(AllRent[i].id, {
              view: AllRent[i].view + 1,
            });
          } else if (AllRent[i].typeOfList == "commercial") {
            await commercialRent.findByIdAndUpdate(AllRent[i].id, {
              view: AllRent[i].view + 1,
            });
          } else if (AllRent[i].typeOfList == "costal") {
            await commercialRent.findByIdAndUpdate(AllRent[i].id, {
              view: AllRent[i].view + 1,
            });
          }
        }

        res.status(200).json({ Rents: AllRent });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};

export const getAllMyListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user.typeofUser == "freelancer") {
          const residentialRents = await residentialRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRents = await costalRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRents = await commercialRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialRents: residentialRents,
            costalRents: costalRents,
            commercialRents: commercialRents,
          });
        } else if (user.typeofUser == "agency") {
          const residentialRents = await residentialRent
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRents = await costalRent
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRents = await commercialRent
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialRents: residentialRents,
            costalRents: costalRents,
            commercialRents: commercialRents,
          });
        } else {
          const residentialRents = await residentialRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalRents = await costalRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialRents = await commercialRent
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialRents.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialRents: residentialRents,
            costalRents: costalRents,
            commercialRents: commercialRents,
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
//////////////////////////////////////UPDATE LISTING////////////////////////////////////////////////////////
export const updateListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialRent.findById(listId);
        const costal = await costalRent.findById(listId);
        const commercial = await commercialRent.findById(listId);
        if (residentail) {
          if (req.user.id == residentail.userId ||req.user.id == residentail.AgencyId) {
            const newRent = await residentialRent
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newRent });
          } else {
            return next(new ApiError(`You Can't Update This List `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            const newRent = await costalRent
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newRent });
          } else {
            return next(new ApiError(`You Can't Update This List `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            const newRent = await commercialRent
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newRent });
          } else {
            return next(new ApiError(`You Can't Update This List `, 400));
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
//////////////////////////////////////DELETE LISTING////////////////////////////////////////////////////////
export const deleteListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialRent.findById(listId);
        const costal = await costalRent.findById(listId);
        const commercial = await commercialRent.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            await residentialRent.findByIdAndDelete(listId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            await costalRent.findByIdAndDelete(listId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            await commercialRent.findByIdAndDelete(listId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 400));
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

export const oneListFromMyListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialRent.findById(listID);
        const costal = await costalRent.findById(listID);
        const commercial = await commercialRent.findById(listID);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            const oneList = await residentialRent
              .find({ _id: listID })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ List: oneList });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This List As Owner`, 404)
            );
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            const oneList = await costalRent
              .find({ _id: listID })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ List: oneList });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This List As Owner`, 404)
            );
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            const oneList = await commercialRent
              .find({ _id: listID })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ List: oneList });
          } else {
            return next(
              new ApiError(`Sorry You Can't view This List As Owner`, 404)
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
//////////////////////////////////////GET LIST FROM OUT LISTING ////////////////////////////////////////////
export const getListFromOut = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialRent.findById(listID);
        const costal = await costalRent.findById(listID);
        const commercial = await commercialRent.findById(listID);
        if (residentail) {
          const oneList = await residentialRent
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
            await residentialRent.findByIdAndUpdate(oneList[0].id, {
            click:oneList[0].click+=1,
          } ,{ new: true });
          // console.log(oneListUp.click)
          res.status(200).json({ List: oneList });
        } else if (costal) {
          const oneList = await costalRent
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" }) 
            .populate({ path: "AgencyId", select: "name-_id" });
          await costalRent.findByIdAndUpdate(oneList[0].id, {
            click:oneList[0].click+=1,
          } ,{ new: true });
          res.status(200).json({ List: oneList });
        } else if (commercial) {
          const oneList = await commercialRent
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await commercialRent.findByIdAndUpdate(oneList[0].id, {
            click:oneList[0].click+=1,
          } ,{ new: true });
          res.status(200).json({ List: oneList });
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};