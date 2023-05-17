import { Router } from 'express';
import CartManager from '../Dao/controllers/cartmanagerDb.js';

const router = Router();

const cartManager = new CartManager();

router.post('/', async(request, response) => {
    
    const respuesta = await cartManager.createCart();

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });

});

router.post('/:cid/product/:pid', async (request, response) => {
    
    const cid = request.params.cid;

    const pid = request.params.pid;

    const respuesta = await cartManager.updateCart(cid, pid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });

});

router.get('/:cid', async(request, response) => {
    
    const cid = request.params.cid;

    const respuesta = await cartManager.getCart(cid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
    
});

export default router;