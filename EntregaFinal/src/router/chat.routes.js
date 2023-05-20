import { Router } from "express";
import messagesModel from "../Dao/models/message.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const messages = await messagesModel.find();
        res.status(200).render('chat', {messages});
    }catch (err) {
        res.status(400).send({
            status: "Error",
            msg: `No se pueden ver los mensajes`
        });
    }
});
export default router;