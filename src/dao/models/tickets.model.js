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
    }
})


const ticketsModel = mongoose.model(collection,ticketSchema);

export default ticketsModel;