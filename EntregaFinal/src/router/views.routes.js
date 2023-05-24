import { Router } from "express";
import ViewsManager from "../Dao/controllers/ViewsManager.js";
import userModel from "../Dao/models/user.model.js";

const router = Router();

const publicAccess = (req, res, next) => {
  if(req.session.user) return res.redirect('/')
  next()
}
const privateAccess = (req, res, next) => {
  if(!req.session.user) return res.redirect('/login')
  next()
}
const adminAccess = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.redirect('/login'); 
  }
  next(); 
};

//ADMIN
router.get('/admin', adminAccess, (req, res) => {
  // Renderizar la vista del panel de administración
  res.render('admin', { user: req.session.user });
});
router.get('/admin/db-user', adminAccess, async (req, res) => {
  try {
    const users = await userModel.find().lean();
    res.render('dbuser', { users });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los usuarios de la base de datos' });
  }
});

router.get('/admin/rendimientos', adminAccess, (req, res) => {
  // Renderizar la vista de Rendimientos para administradores
  res.render('rendimientos', { user: req.session.user });
});

router.get('/admin/agregar-productos', adminAccess, (req, res) => {
  // Renderizar la vista de Agregar Productos para administradores
  res.render('addProducts', { user: req.session.user });
});

// HOME
router.get('/', privateAccess, async (req, res) => {
  await ViewsManager.renderHome(req, res);
});


// ALL PRODUCT
router.get('/products',  privateAccess, async (req, res) => {
  await ViewsManager.renderProducts(req, res);
});
// 1 PRODUCT
router.get('/product/:id',  privateAccess, async (req, res) => {
  await ViewsManager.renderProduct(req, res);
});
// CART
router.get('/cart/:id', privateAccess, async (req, res) => {
  await ViewsManager.renderCart(req, res);
});

// SESSION
router.get('/profile', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

router.get('/register', publicAccess, (req, res) => {
  res.render('register')
})

router.get('/login', publicAccess, (req, res) => {
  res.render('login')
})

export default router;