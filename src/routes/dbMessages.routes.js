import {Router} from "express";
import { getAllMessages } from "../controllers/dbMessage.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.get("/",checkRole(["usuario"]) ,getAllMessages);

export { router as dbMessageRouter}