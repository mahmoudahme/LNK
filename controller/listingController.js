import { configDotenv } from "dotenv";
import commercialList from "../model/Sales/commercialList.js";
import commercialRent from "../model/Rent/commercialRent.js";
import costalRent from "../model/Rent/costalRent.js";
import residentialRent from "../model/Rent/residentialRent.js";
import costalList from "../model/Sales/costalList.js";
import residentialList from "../model/Sales/residentialList.js";
import User from "../model/User/User.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

configDotenv({ path: "config/config.env" });

////////////////////////////////////////////CREATING LISTING/////////////////////////////////////////////////
export const createlisting = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const user = await User.findById(req.user.id);
        if (user.activation) {
          let range = req.body.price;
          if (req.body.typeOfList == "residential") {
            const createdListing = new residentialList({
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
              price: req.body.price,
              typeOfPay: req.body.typeOfPay,
              years: req.body.years,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdListing.save();
          } else if (req.body.typeOfList == "costal") {
            const createdListing = new costalList({
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
              price: req.body.price,
              typeOfPay: req.body.typeOfPay,
              years: req.body.years,
              range: range,
              typeOfPublish: req.body.typeOfPublish,
              whatsApp: req.body.whatsApp,
              phoneNumber: req.body.phoneNumber,
              userId: req.user.id,
              AgencyId: user.UserId,
            });
            await createdListing.save();
          } else if (req.body.typeOfList == "commercial") {
            const createdListing = new commercialList({
              typeOfList: req.body.typeOfList,
              location: req.body.location,
              apartment: req.body.apartment,
              title: req.body.title,
              description: req.body.description,
              area: req.body.area,
              finishing: req.body.finishing,
              additional: req.body.additional,
              price: req.body.price,
              typeOfPay: req.body.typeOfPay,
              years: req.body.years,
              range: range,
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

//////////////////////////////////////////////GET ALL MY LIST //////////////////////////////////////////////

export const getAllMyListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user.typeofUser == "freelancer") {
          const residentialLists = await residentialList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalLists = await costalList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialLists = await commercialList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialLists: residentialLists,
            costalLists: costalLists,
            commercialLists: commercialLists,
          });
        } else if (user.typeofUser == "agency") {
          const residentialLists = await residentialList
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalLists = await costalList
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialLists = await commercialList
            .find({ AgencyId: user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialLists: residentialLists,
            costalLists: costalLists,
            commercialLists: commercialLists,
          });
        } else {
          const residentialLists = await residentialList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const costalLists = await costalList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          const commercialLists = await commercialList
            .find({ userId: req.user.id })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          residentialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          costalLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          commercialLists.sort((a, b) => {
            const order = {
              turboPlus: 1,
              turbo: 2,
              normal: 3,
            };
            return order[a.typeOfPublish] - order[b.typeOfPublish];
          });
          res.status(200).json({
            residentialLists: residentialLists,
            costalLists: costalLists,
            commercialLists: commercialLists,
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////GET ALL LISTING////////////////////////////////////////////////////////
export const getAllListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const residentialLists = await residentialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalLists = await costalList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const commercialLists = await commercialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Listing = residentialLists.concat(costalLists);
        let AllListtings = Listing.concat(commercialLists);
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
          if (AllListing[i].typeOfList == "residential") {
            await residentialList.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view + 1,
            });
          } else if (AllListing[i].typeOfList == "commercial") {
            await commercialList.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view + 1,
            });
          } else if (AllListing[i].typeOfList == "costal") {
            await costalList.findByIdAndUpdate(AllListing[i].id, {
              view: AllListing[i].view + 1,
            });
          }
        }

        res.status(200).json({ Listing: AllListing });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////UPDATE LISTING////////////////////////////////////////////////////////
export const updateListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialList.findById(listId);
        const costal = await costalList.findById(listId);
        const commercial = await commercialList.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            const newListing = await residentialList
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newListing });
          } else {
            return next(new ApiError(`You Can't Update This List `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            const newListing = await costalList
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newListing });
          } else {
            return next(new ApiError(`You Can't Update This List `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            const newListing = await commercialList
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newListing });
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////DELETE LISTING////////////////////////////////////////////////////////
export const deleteListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialList.findById(listId);
        const costal = await costalList.findById(listId);
        const commercial = await commercialList.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            await residentialList.findByIdAndDelete(listId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 400));
          }
        } else if (costal) {
          if (req.user.id == costal.userId || req.user.id == costal.AgencyId) {
            await costalList.findByIdAndDelete(listId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 400));
          }
        } else if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId
          ) {
            await commercialList.findByIdAndDelete(listId);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////GET ONE LIST FROM MY LISTING////////////////////////////////////////////////////////
export const oneListFromMyListing = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialList.findById(listID);
        const costal = await costalList.findById(listID);
        const commercial = await commercialList.findById(listID);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId
          ) {
            const oneList = await residentialList
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
            const oneList = await costalList
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
            const oneList = await commercialList
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////GET LIST FROM OUT LISTING ////////////////////////////////////////////

export const getListFromOut = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialList.findById(listID);
        const costal = await costalList.findById(listID);
        const commercial = await commercialList.findById(listID);
        if (residentail) {
          const oneList = await residentialList
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await residentialList.findByIdAndUpdate(
            oneList[0].id,
            {
              click: (oneList[0].click += 1),
            },
            { new: true }
          );
          // console.log(oneListUp.click)
          res.status(200).json({ List: oneList });
        } else if (costal) {
          const oneList = await costalList
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await costalList.findByIdAndUpdate(
            oneList[0].id,
            {
              click: (oneList[0].click += 1),
            },
            { new: true }
          );
          res.status(200).json({ List: oneList });
        } else if (commercial) {
          const oneList = await commercialList
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          await commercialList.findByIdAndUpdate(
            oneList[0].id,
            {
              click: (oneList[0].click += 1),
            },
            { new: true }
          );
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
////////////////////////////////// ////////only costalList/////////////////////////////////////////////////////
export const getAllcostalList = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const costalLists = await costalList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalRents = await costalRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Listing = costalLists.concat(costalRents);
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        let Listings = shuffleArray(Listing);

        Listings.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });
        for (var i = 0; i < Listings.length; i++) {
          await costalList.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
          await costalRent.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
        }

        res.status(200).json({ All: Listings });
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
        const residentialLists = await residentialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        const residentialRents = await residentialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Listing = residentialLists.concat(residentialRents);

        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        let Listings = shuffleArray(Listing);

        residentialLists.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });

        for (var i = 0; i < Listings.length; i++) {
          await residentialList.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
          await residentialRent.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
        }
        res.status(200).json({ All: Listings });
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
        const commercialLists = await commercialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        const commercialRents = await commercialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let Listing = commercialLists.concat(commercialRents);

        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        let Listings = shuffleArray(Listing);
        Listings.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });
        for (var i = 0; i < Listings.length; i++) {
          await commercialList.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
          await commercialRent.findByIdAndUpdate(Listings[i].id, {
            view: Listings[i].view + 1,
          });
        }
        res.status(200).json({ All: Listings });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AllListingAndRents = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const residentailSale = await residentialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const residentailRents = await residentialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const commercialSale = await commercialList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const commerciallRents = await commercialRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalSale = await costalList
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        const costalRents = await costalRent
          .find()
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });

        let List1= residentailSale.concat(residentailRents);
        let List2 = List1.concat(commercialSale);
        let List3 = List2.concat(commerciallRents);
        let List4 = List3.concat(costalSale);
        let List5 = List4.concat(costalRents);

        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        let Listings = shuffleArray(List5);
        
        Listings.sort((a, b) => {
          const order = {
            turboPlus: 1,
            turbo: 2,
            normal: 3,
          };
          return order[a.typeOfPublish] - order[b.typeOfPublish];
        });
        res.status(200).json({ All: Listings });
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
};
