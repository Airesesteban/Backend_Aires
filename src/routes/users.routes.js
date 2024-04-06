import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UserController, getAllUsers, deleteInactiveUsers } from "../controllers/users.controller.js";


const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UserController.changeRol);
router.get("/",getAllUsers);
router.delete("/",deleteInactiveUsers)

export { router as userRouter};