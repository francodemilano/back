import { Router } from 'express';
import ProductManager from '../dao/managers/productmanagerDb.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (request, response)=>{
    const limit = parseInt(request.query.limit);

    const respuesta = await productManager.getProducts(limit);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

router.get('/:pid', async (request, response)=>{
    const pid = request.params.pid;

    const respuesta = await productManager.getProductByID(pid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

router.post('/', async (request, response)=>{
    
    const product = request.body;

    const respuesta = await productManager.addProduct(product);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });

});

router.put('/:pid', async (request, response)=>{
    
    const pid = request.params.pid;
    
    const product = request.body;

    const respuesta = await productManager.updateProduct(pid, product);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });

});

router.delete('/:pid', async (request, response)=>{
    const pid = request.params.pid;

    const respuesta = await productManager.deleteProduct(pid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

export default router;