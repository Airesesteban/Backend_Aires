import mongoose from 'mongoose';

const collection = "Tickets";

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: Date,

    amount: Number,

    purchaser:{
        type: String,
        required: true
    },
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
    ]
})


const ticketsModel = mongoose.model(collection,ticketSchema);

export default ticketsModel;