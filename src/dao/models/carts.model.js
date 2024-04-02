import mongoose from 'mongoose';

const collection = "Carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true, 
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    paid:{
        type: Boolean,
        default: false,
        required: true
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        required: false
    }
});

cartSchema.pre('find', function () {
    this.populate('products.product')
})


const cartsModel = mongoose.model(collection,cartSchema);

export default cartsModel;