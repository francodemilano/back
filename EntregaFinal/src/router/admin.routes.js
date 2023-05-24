import { Router } from "express";
import userModel from "../Dao/models/user.model.js";
import productModel from "../Dao/models/products.model.js";


const router = Router();

const adminAccess = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.redirect('/login'); 
  }
  next(); 
};

router.get('/admin', adminAccess, (req, res) => {
  res.render('admin', { user: req.session.user });
});

router.post('/admin/db-user/:userId', adminAccess, async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    
    res.redirect('/admin/db-user');
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar el usuario de la base de datos' });
  }
});

router.post('/admin/agregar-productos', adminAccess, async (req, res) => {
  try {
    const { title, description, price, category, status, img, code, stock } = req.body;
    if (!title || !description || !price || !category || !status || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
    const productData = { title, description, price, category, status, img, code, stock };

    const result = await productModel.create(productData);
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send({ error: 'Error al agregar el producto a la base de datos' });
  }
});

export default router