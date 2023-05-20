import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


const collection = 'cart';

const cartSchema = new mongoose.Schema({
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }],
  });

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(collection, cartSchema);

export default cartModel;