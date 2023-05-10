import { Router } from "express";
import AccesManager from "../Dao/controllers/AccesManager.js";
import productModel from "../Dao/models/products.model.js";


const accesManager = new AccesManager();
const router = Router();

router.get('/', async (req, res)=>{
    try{
        await accesManager.createRecord('MOSTRAR PRODUCTOS');
        const result = await productModel.find();
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `No se pueden ver los productos`
        });
    }
});
router.get('/:id', async (req, res)=>{
    try{
       
        await accesManager.createRecord('MOSTRAR PRODUCTO POR ID');
        const id = req.params.pid;
        const result = await productModel.find({_id:id});
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto no existe`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        
        await accesManager.createRecord('PRODUCTO CREADO');
        const {title, description, price,category, img, code, stock} = req.body;
        if (!title || !description || !price || !category || !img || !code || !stock){
            return res.status(400).send({error: 'Faltan datos'});
        }
        const product = {title, description, price, category, img, code, stock};
        const result = await productModel.create(product);
        res.status(200).send({result});
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
       
        await accesManager.createRecord('PRODUCTO ELIMINADO');
        const id = req.params.id;
        const result = await productModel.deleteOne({_id:id});
        res.status(200).send({result});
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto no se puede eliminar`
        });
    }
});
router.put('/:id', async (req, res)=>{
    try{
        
        await accesManager.createRecord('PRODUCTO ACTUALIZADO');
        const id = req.params.id;
        const updateProduct = req.body;
        const result = await productModel.updateOne({_id: id}, {$set: updateProduct});
        res.status(200).send({result});
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto no se puede actualizar.`
        });
    }
});

export default router;
