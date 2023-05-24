import productModel from "../models/products.model.js";

export default class ProductManagerMongo {

  async addProduct(productData) {
    const { title, description, price, category, status, img, code, stock } = productData;
    if (!title || !description || !price || !category || !status || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
    const product = { title, description, price, category, status, img, code, stock };
    const result = await productModel.create(product);
    return result;
  }

}