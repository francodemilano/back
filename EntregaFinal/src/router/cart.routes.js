import { Router } from "express";
import CartManagerMongo from '../Dao/controllers/CartManagerMongo.js';
import cartModel from "../Dao/models/cart.model.js";

const router = Router()
const cartManager = new CartManagerMongo();

router.get('/', async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.send(carts);
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se pueden obtener los carritos',
      });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const cartId = req.params.id;
      const cart = await cartManager.getCartById(cartId);
      res.send(cart);
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se puede obtener el carrito',
      });
    }
  });

router.get('/:id/details', async (req, res) => {
    try {
      const cartId = req.params.id;
      const cart = await cartManager.getCartDetails(cartId);
      res.send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al obtener los detalles del carrito.' });
    }
  });

router.post('/', async (req, res) => {
    try {
      const cart = await cartManager.addCart();
      res.send(cart);
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se puede crear el carrito',
      });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const cartId = req.params.id;
      const result = await cartManager.deleteCart(cartId);
      res.send({ deletedCount: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'No se puede eliminar el carrito' });
    }
  });


router.delete('/:id/empty', async (req, res) => {
    try {
      const cartId = req.params.id;
      await cartManager.emptyCart(cartId);
      res.send({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se puede vaciar el carrito',
      });
    }
  });


router.post('/:cartId/products/:productId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      await cartManager.addProductInCart(cartId, productId);
      res.send({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se puede agregar el producto al carrito',
      });
    }
  });


router.put('/:cartId/products/:productId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      await cartManager.updateProductQuantityInCart(cartId, productId);
      res.send({ message: 'Cantidad del producto en el carrito actualizada correctamente' });
    } catch (error) {
      res.status(400).send({
        status: 'Error',
        msg: 'No se puede actualizar la cantidad del producto en el carrito',
      });
    }
  });


router.put('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const products = req.body;
  
    try {
      const cart = await cartManager.getCartById(cartId);
      if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
      }
  
      for (const product of products) {
        const _id = product._id;
        const quantity = product.quantity || 1;
        await cartManager.addProductInCart(cartId, _id, quantity);
      }
  
      await cart.save(); 
  
      res.send({ message: 'Productos cargados exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });


  
export default router;
  

