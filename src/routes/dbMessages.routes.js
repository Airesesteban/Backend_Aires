import {Router} from "express";
import { getAllMessages } from "../controllers/dbMessage.controller.js";
/* import messageModel from "../dao/models/message.model.js"; */

const router = Router();

router.get("/",getAllMessages);

/* router.get("/", async (req, res) => {
    const message = await messageModel.find();
    res.send({messages});

}); */

export { router as dbMessageRouter}