import fs from 'fs';
import ProductManager from "./ProductManager.js";

const path ='./src/Dao/models/carts.json';
const productManager = new ProductManager();

export default class CartManager {
    getCarts = async ()=>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        };
    };
    addCart = async ()=>{
        const carts = await this.getCarts();
        const newCart = {
            cid: "CART" + (carts.length + 1),
            products: []
        };
        const addCart = [...carts, newCart];
            await fs.promises.writeFile(path, JSON.stringify(addCart, null, '\t'));
                return newCart;
    };
    getCartById = async (cid)=>{
        const carts = await this.getCarts();
        const cart = carts.filter((cart)=>{
            return cart.cid == cid;
        });
        if (cart.length === 0) {
            return null;
        }
            return cart;
    };
    

    addProductToCart = async (cid, pid) => {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex((cart) => cart.cid === cid);  
                if (cartIndex === -1) {
                    return console.error(`El carrito con id: ${cid} no existe.`);
                }
            const cart = carts[cartIndex];
            const product = await productManager.getProductById(pid);
                if (product === null) {
                    return console.error(`El producto con id: ${pid} no existe.`);
                }
            const productIndex = cart.products.findIndex((p) => p.pid === pid);
                if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
                } else {
            cart.products.push({ pid, quantity: 1 });
            }
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
                    return cart;
        };
    };