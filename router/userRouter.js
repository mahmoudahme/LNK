import  express  from "express";
import {verifyToken} from "../Utils/verifyToken.js"
import {getAllUsers ,deleteUser ,getUerById , updateUser} from "../controller/userController.js";

const router = express.Router();

router.get("/" , getAllUsers);
router.get("/:id" , getUerById);
router.delete("/:id" , deleteUser);
router.put("/:id"  , updateUser);

export default router