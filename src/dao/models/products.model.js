import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    status: {
        type: Boolean,
        default: true,
    },

    stock: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    thumbnails: String,

})

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection,productsSchema);

export default productsModel;