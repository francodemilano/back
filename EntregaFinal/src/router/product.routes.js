import { Router } from 'express';
import ProductManagerMongo from '../Dao/controllers/ProductManagerMongo.js';

const router = Router();
const productManager = new ProductManagerMongo();

// MUESTRA PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).send({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

// PRODUCTO POR ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productManager.getProductsById(productId);
    
    res.status(200).send({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

//AGREGA PRODUCTO
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    await productManager.addProduct(productData);
    res.status(200).send({ msg: 'Producto creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

// BORRA PRODUCTO POR ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await productManager.deleteProduct(productId);
    res.status(200).send({ msg: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

//ACTUALIZA PRODUCTO POR ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    await productManager.updateProduct(productId, updateData);
    res.status(200).send({ msg: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

export default router;