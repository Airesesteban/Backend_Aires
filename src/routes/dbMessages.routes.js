import {Router} from "express";
import messageModel from "../dao/models/message.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const message = await messageModel.find();
    res.send({messages});

});

export { router as dbMessageRouter}