import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { changeRol, getAllUsers, deleteInactiveUsers, deleteUser, getUserCart } from "../controllers/users.controller.js";


const router = Router();

router.put("/premium/:uid", checkRole(["admin"]),changeRol);
router.get("/",checkRole(["admin"]),getAllUsers);
router.delete("/",checkRole(["admin"]),deleteInactiveUsers)
router.delete("/:uid",checkRole(["admin"]),deleteUser)
router.get("/:uid/cart",getUserCart);

export { router as userRouter};