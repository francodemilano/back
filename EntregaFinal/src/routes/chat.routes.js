
import { Router } from "express";
import MessageManager from "../Dao/managers/messageManagerDb";

const router = Router();

const messageManager = new MessageManager();

router.get('/', async (request, response) => {
    
    const messageHistory = await messageManager.getMessages();

    response.render('chat', {
        messages: messageHistory.message
    });

});

export default router;