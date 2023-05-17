import productModel from "../models/products.model.js";

export default class ProductManagerMongo {
  async getProducts() {
    const result = await productModel.find();
    return result;
  }

  async getProductsById(id) {
    const result = await productModel.find({ _id: id });
    return result;
  }

  async addProduct(productData) {
    const { title, description, price, category, status, img, code, stock } = productData;
    if (!title || !description || !price || !category || !status || !img || !code || !stock) {
      throw new Error("Faltan datos");
    }
    const product = { title, description, price, category, status, img, code, stock };
    const result = await productModel.create(product);
    return result;
  }

  async deleteProduct(id) {
    const result = await productModel.deleteOne({ _id: id });
    return result;
  }

  async updateProduct(id, updateProduct) {
    const result = await productModel.updateOne({ _id: id }, { $set: updateProduct });
    return result;
  }
}

