import mongoose from 'mongoose';
import cartsModel from "../dao/models/carts.model.js"; 

class dbCartManager{

    async getCarts(){
        try {
            const carts = await cartsModel.find();
            return carts;
        }
        catch(error){
            console.error("Error al obtener el carro desde MongoDB");
        }
    }

    async getCartById(id){
        try {
            const cart = await cartsModel.find({_id:id});
            return cart;
        }
        catch(error){
            console.error("Error al obtener el carro con ID");
        }
    }

    async addCart(){
        try {
            const newCart = await cartsModel.create({})
            return newCart;
        }
        catch(error){
            console.error("Error en agregar carrito", error);

        }
    }

    async addProductToCart(cid,pid,quantity){
        try {
            const cart = await cartModel.findOne({ id: cid });

            if(cart){
                cart.products.push(pid)({id_prod:pid, quantity:quantity})
                await cart.save();
                return cart
            }else{
                return "Carro no encontrado"
            }

        }
        catch(error){
            console.error("Error en agregar carrito");
        }
    }
}

export { dbCartManager };