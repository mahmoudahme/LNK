import commercialList from "../model/Sales/commercialList.js";
import costalList from "../model/Sales/costalList.js";
import residentialList from "../model/Sales/residentialList.js";
import commercialRent from "../model/Rent/commercialRent.js";
import costalRent from "../model/Rent/costalRent.js";
import residentialRent from "../model/Rent/residentialRent.js";
import residentailRequest from "../model/Sale Request/residentailRequest.js"
import commercialRequest from "../model/Sale Request/commercialRequest.js"
import costalRequest from "../model/Sale Request/costalRequest.js"
import residentialRequestRent from "../model/Rent Request/residentialRequestRent.js"
import commercialRequestRent from "../model/Rent Request/commercialRequestRent.js"
import costalRequestRent from "../model/Rent Request/costalRequestRent.js"
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import stringSimailaty from "string-similarity";


export const filteration = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {
          minRange,
          maxRange,
          maxArea,
          minArea,
          keyWords,
          ...otherQueryParams
        } = req.query;
        const otherQuery = Object.fromEntries(
          Object.entries(otherQueryParams).filter(
            ([key, value]) => value !== undefined && value !== ""
          )
        );
        if (otherQuery.typeOfList == "residential") {
          const lists = await residentialList.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialList.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfList == "commercial") {
          const lists = await commercialList.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialList.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfList == "costal") {
          const lists = await costalList.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentialList.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialList.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentialList.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialList.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const filterationRent = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {
          minRange,
          maxRange,
          maxArea,
          minArea,
          keyWords,
          ...otherQueryParams
        } = req.query;
        const otherQuery = Object.fromEntries(
          Object.entries(otherQueryParams).filter(
            ([key, value]) => value !== undefined && value !== ""
          )
        );
        if (otherQuery.typeOfList == "residential") {
          const lists = await residentialRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentialRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentialRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentialRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfList == "commercial") {
          const lists = await commercialRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await commercialRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await commercialRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await commercialRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await commercialRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfList == "costal") {
          const lists = await costalRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await costalRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await costalRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await costalRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await costalRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const filterationRequest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {
          minRange,
          maxRange,
          maxArea,
          minArea,
          keyWords,
          ...otherQueryParams
        } = req.query;
        const otherQuery = Object.fromEntries(
          Object.entries(otherQueryParams).filter(
            ([key, value]) => value !== undefined && value !== ""
          )
        );
        if (otherQuery.typeOfRequest == "residential") {
          const lists = await residentailRequest.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentailRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentailRequest.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentailRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentailRequest.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentailRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentailRequest.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialList.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfRequest == "commercial") {
          const lists = await commercialRequest.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await commercialRequest.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await commercialRequest.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await commercialRequest.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await commercialRequest.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfRequest == "costal") {
          const lists = await costalRequest.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await costalRequest.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await costalRequest.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequest.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await costalRequest.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await costalRequest.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const filterationRentRequest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const {
          minRange,
          maxRange,
          maxArea,
          minArea,
          keyWords,
          ...otherQueryParams
        } = req.query;
        const otherQuery = Object.fromEntries(
          Object.entries(otherQueryParams).filter(
            ([key, value]) => value !== undefined && value !== ""
          )
        );
        if (otherQuery.typeOfRequest == "residential") {
          const lists = await residentialRequestRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await residentialRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await residentialRequestRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await residentialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await residentialRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await residentialRequestRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfRequest == "commercial") {
          const lists = await commercialRequestRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await commercialRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await commercialRequestRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await commercialRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await commercialRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await commercialRequestRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        } else if (otherQuery.typeOfRequest == "costal") {
          const lists = await costalRequestRent.find(otherQuery);
          if (minRange !== "" && maxRange !== "") {
            var listFilter = lists.filter(
              (list) => list.price > minRange && list.price < maxRange
            );
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = listFilter.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                  await costalRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                    view: lastFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: lastFilter });
              }
            } else {
              listFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < listFilter.length; i++) {
                  const arabicText1 = listFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(listFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < listFilter.length; i++) {
                  await costalRequestRent.findByIdAndUpdate(listFilter[i].id, {
                    view: listFilter[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: listFilter });
              }

            }
          } else {
            if (minArea !== "" && maxArea !== "") {
              var lastFilter = lists.filter(
                (list) => list.area > minArea && list.area < maxArea
              );
              lastFilter.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              if (keyWords !== "") {
                var arr1 = [];
                for (var i = 0; i < lastFilter.length; i++) {
                  const arabicText1 = lastFilter[i].title;
                  const arabicText2 = keyWords;
                  const similarity = stringSimailaty.compareTwoStrings(
                    arabicText1,
                    arabicText2
                  );
                  if (similarity * 100 > 10) {
                    arr1.push(lastFilter[i]);
                  }
                }
                for (var i = 0; i < arr1.length; i++) {
                  await costalRequestRent.findByIdAndUpdate(arr1[i].id, {
                    view: arr1[i].view + 1,
                  });
                }
                res.status(200).json({ Listing: arr1 });
              } else {
                for (var i = 0; i < lastFilter.length; i++) {
                await costalRequestRent.findByIdAndUpdate(lastFilter[i].id, {
                  view: lastFilter[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lastFilter });
              }
            } else {
              lists.sort((a, b) => {
                const order = {
                  turboPlus: 1,
                  turbo: 2,
                  normal: 3,
                };
                return order[a.typeOfPublish] - order[b.typeOfPublish];
              });
              for (var i = 0; i < lists.length; i++) {
                await costalRequestRent.findByIdAndUpdate(lists[i].id, {
                  view: lists[i].view + 1,
                });
              }
              res.status(200).json({ Listing: lists });
            }
          }
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 404));
      }
    });
  } catch (error) {
    return next(new ApiError(`System Error `, 404));
  }
}