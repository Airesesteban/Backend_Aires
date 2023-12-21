import mongoose from 'mongoose';

const collection = "Products";

const productsSchema = new moongose.Schema({
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

const productsModel = mongoose.model(collection,productsSchema);

export default productsModel;