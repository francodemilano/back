import mongoose from 'mongoose';

const collection = 'cart'
const schema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});
const cartModel = mongoose.model(collection, schema);
export default cartModel;