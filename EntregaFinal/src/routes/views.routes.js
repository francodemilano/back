import { Router } from "express";
import AccesManager from "../Dao/controllers/AccesManager.js";
import productModel from "../Dao/models/products.model.js";

const router = Router();
const accesManager = new AccesManager()

router.get('/realTimeProducts', async (req, res) => {
try {
    let allProducts = await productManager.getProducts()
        res.render('realTimeProducts', {allProducts}); 
} catch (error) {
    res.status(400).send({
    status: "Error",
    msg: `Los productos solicitados no se pueden visualizar.`
    });
}
});
router.get('/', async (req, res)=>{
    try{
        await accesManager.createRecord('GET PRODUCTS');
        const products = await productModel.find();
        res.render('home', { products });
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `No se pueden ver los productos`
        });
    }
});

export default router;