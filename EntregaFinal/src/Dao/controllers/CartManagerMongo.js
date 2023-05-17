import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";

export default class CartManagerMongo {

  async getCartDetails(cartId) {
    const cart = await cartModel
      .findById(cartId)
      .populate('products.product');
    return cart;
  }

  async getCarts() {
    const carts = await cartModel.find();
    return carts;
  }

  async getCartById(cartId) {
    const cart = await cartModel.findById(cartId);
    return cart;
  }

  async addCart() {
    const cart = await cartModel.create({ products: [] });
    return cart;
  }

  async deleteCart(cartId) {
    const result = await cartModel.deleteOne({ _id: cartId });
    return result.deletedCount;
  }

  async addProductInCart(cartId, productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) {
      return null;
    }
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      cart.products.push({ product: productId, quantity: quantity || 1 }); 
    }
    await cart.save();
    return cart;
  }

  async emptyCart(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    cart.products = [];
    await cart.save();
    return cart;
  }

  async updateProductQuantityInCart(cartId, productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) {
      return null;
    }
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (!existingProduct) {
      return null;
    }
    if (quantity === 0) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
    } else {
      existingProduct.quantity = quantity;
    }
    await cart.save();
    return cart;
  }
}



