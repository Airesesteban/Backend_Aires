import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UserController, getAllUsers, deleteInactiveUsers, deleteUser } from "../controllers/users.controller.js";


const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UserController.changeRol);
router.get("/",checkRole(["admin"]),getAllUsers);
router.delete("/",checkRole(["admin"]),deleteInactiveUsers)
router.delete("/:email",checkRole(["admin"]),deleteUser)

export { router as userRouter};