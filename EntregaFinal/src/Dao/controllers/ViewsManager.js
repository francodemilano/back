import productModel from "../models/products.model.js";
import cartModel from "../models/cart.model.js";


export default class ViewsManager {

        static async renderHome(req, res) {
          const { page = 1, limit, query } = req.query;
          const opt = { page, limit: parseInt(limit) || 40, lean: true };
                opt.sort = { price: -1 };
          const filter = {};
                if (query) {
                    filter.$or = [
                    { category: { $regex: new RegExp(query, 'i') } },
                    { title: { $regex: new RegExp(query, 'i') } }
                    ];
                } else {
                    filter.category = { $exists: true };
                 }
          const { docs } = await productModel.paginate(filter, opt);
          const products = docs;
            res.render('home', {
            title: "Drink Home",
            products
          });
        }

    static async renderProducts(req, res) {
      try {
        let { page = 1, limit, query, sort, category } = req.query;
        const opt = { page, limit: parseInt(limit) || 3, lean: true };
          if (sort) {
            opt.sort = { [sort]: 1 };
          } else {
            opt.sort = { title: 1 };
          }
        const filter = {};
          if (query) {
            filter.$or = [
              { category: { $regex: new RegExp(query, 'i') } },
              { title: { $regex: new RegExp(query, 'i') } }
            ];
          }
          if (category) {
            filter.category = category;
          } else {
            filter.category = { $exists: true };
          }
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, status, totalpage } = await productModel.paginate(filter, opt);
        const products = docs;
        const message = products.length === 0 ? 'No se encontraron productos' : '';
        const urlParams = { page, limit, query, sort, category }; // Almacena los parámetros de la URL
            res.render('prod', {
            title: "Drink Home",status, totalpage, products, hasPrevPage, hasNextPage, nextPage, prevPage, query, message, urlParams // Pasa los parámetros de la URL a la plantilla
        });
        } catch (error) {
            res.status(500).send({ error: 'Error al obtener los productos' });
        }
        }
    

      static async renderProduct(req, res) {
        try {
          const productId = req.params.id;
          const product = await productModel
            .findById(productId)
            .lean();    
          if (!product) {
            return res.status(204).end();
          }
          res.render('product', { product });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Error interno del servidor' });
        }
      }
    

      static async renderCart(req, res) {
        const { id } = req.params;
        try {
          const cart = await cartModel
              .findById(id)
              .populate("products.product")
              .lean();
          if (!cart) {
            return res.status(204).end();
          }

          const total = cart.products.reduce((acc, product) => {
            return acc + product.product.price * product.quantity;
          }, 0);
              res.render("cart", { title: "Carrito", cart, total });
        } catch (error) {
              res.status(500).send({ message: error.message });
        }
      }
    }