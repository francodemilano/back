import { Router } from "express";
import CartManagerMongo from '../Dao/controllers/CartManagerMongo.js';

const router = Router()
const cartManager = new CartManagerMongo();

// MUESTRA TODOS LOS CARRITOS 
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
  
// MUESTRA 1 CARRITO SEGUN SU ID 
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

// MUESTRA EN DETALLE EL PRODUCTO EN EL CARRITO
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

// CREA CARRITO
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

// BORRA EL CARRITO
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

// VACIA EL CARRITO
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

// AGREGA UN PRODUCTO
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

// ACTUALIZA CANTIDAD // INNECESARIO DADO QUE CON EL PUT DE ABAJO HACEMOS LO MISMO.
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

// AGREGA VARIOS PRODUCTOS AL CARRITO
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
  
      await cart.save(); // Guardar el carrito actualizado en la base de datos
  
      res.send({ message: 'Productos cargados exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });


  
export default router;
  

// VIEJO TENIAMOS LAS ROUTERS SIN LOS PARAMETROS.
/* import { Router } from "express";
import CartManagerMongo from "../Dao/controllers/CartManagerMongo.js";

const router = Router();

const CartManager = new CartManagerMongo();

// muestra el el cart el producto detallado
router.get('/details/:id', CartManager.getCartDetails)
router.get('/', CartManager.getCarts);
router.get('/:id', CartManager.getCartById);
router.post('/', CartManager.addCart);
router.delete('/:id', CartManager.deleteCart);
router.post('/:cartId/product/:productId', CartManager.addProductInCart);
// router api/carts/delete/id cart/ products
router.delete("/delete/:id/products", CartManager.emptyCart);
// actualizar la cantidad 
router.patch("/carts/:cartId/products/:productId", CartManager.updateProductQuantityInCart);

// falta el put que permita agregar varios productos en el cart.

export default router;
 */