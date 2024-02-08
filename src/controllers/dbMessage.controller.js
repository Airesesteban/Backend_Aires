import messageModel from "../dao/models/message.model.js";

async function getAllMessages (req, res)  {
    const message = await messageModel.find();
    res.send({messages});
}

export { getAllMessages };
