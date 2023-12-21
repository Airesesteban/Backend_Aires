import mongoose from 'mongoose';

const collection = "Carts";

const cartSchema = new mongoose.Schema({
    id:{type: Number, required: true},
    products: [
        {
        id: {type: Number, required: true},
        quantity: {type: Number, required:true}
        }
    ]
});

cartSchema.pre('find', function () {
    this.populate('products.id_prod')
})


const cartsModel = mongoose.model(collection,cartsSchema);

export default cartsModel;