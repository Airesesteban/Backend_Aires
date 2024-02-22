import {Router} from "express";
import { getAllMessages } from "../controllers/dbMessage.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.get("/",checkRole(["user"]) ,getAllMessages);

export { router as dbMessageRouter}