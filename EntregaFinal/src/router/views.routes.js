import { Router } from "express";
import ViewsManager from "../Dao/controllers/ViewsManager.js";

const router = Router();


router.get('/', async (req, res) => {
  await ViewsManager.renderHome(req, res);
});

router.get('/products', async (req, res) => {
  await ViewsManager.renderProducts(req, res);
});

router.get('/product/:id', async (req, res) => {
  await ViewsManager.renderProduct(req, res);
});

router.get('/cart/:id', async (req, res) => {
  await ViewsManager.renderCart(req, res);
});

export default router;
