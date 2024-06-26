import mongoose from 'mongoose';

const collection = "Users"

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Carts"
    },
    roles: { type: String, enum: ["admin", "usuario", "premium"], default: "usuario" },
    last_connection: Date
});    

const userModel = mongoose.model(collection, schema);

export default userModel;