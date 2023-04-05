import express from "express";
import ProductManager from "./manager/ProductManager.js";

const app = express();

const port = 8080;


app.listen(process.env.port || port, () => console.log('Server listening on port: (8080)'))

const productManager = new ProductManager('./src/files/Products.json')


app.get('/products', async (req, res) => {
    const limit = req.query.limit
    const allProducts = await productManager.getProducts()
    
    if (!limit) return res.send(allProducts)

    const productsLimited = allProducts.slice(0,parseInt(limit))
    res.send(productsLimited)
})


app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid
    let products = await productManager.getProducts()
    let product = products.find(product => product.id === parseInt(pid))
    if (!product) return res.send({ error: 'Product not found.' })
    res.send({ product })
})