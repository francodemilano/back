import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = 'Products'

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    stock:{
        type: Number,
        require: true
    }
    
})

schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)
export default productModel
