import cartsModel from "../models/carts.model.js"; 
import productsModel from "../models/products.model.js";
import {v4 as uuidv4} from 'uuid';
import ticketsModel from "../models/tickets.model.js";

class dbCartManager{

    async getCarts(){
        try {
            const carts = await cartsModel.find();
            return carts;
        }
        catch(error){
            console.error("Error al obtener el carro desde MongoDB",error);
        }
    }

    async getCartById(id){
        try {
          const cart = await cartsModel
          .findOne({ _id: id })
          .populate('products.product');
            return cart;
        }
        catch(error){
            console.error("Error al obtener el carro con ID");
            throw error;
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
            const cart = await cartsModel.findOne({ _id: cid });



            if(cart){

                let productsInCart = cart.products;
        
                const indexProduct = productsInCart.findIndex((product)=> product.product == pid );
                if(indexProduct == -1){

                cart.products.push({id_prod:pid, quantity:quantity})
                }else{
                    cart.products[indexProduct].quantity += quantity; 
                }
                await cart.save();
                return cart

            }else{
                return "Carro no encontrado"
            }

        }
        catch(error){
            console.error("Error en agregar carrito",error);
        }
    }

async deleteProductCart(cid,pid){
    try { 
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return "Error: el formato del carrito no es válido";
        }            
        if (!mongoose.Types.ObjectId.isValid(pid)) {
        return "Error: el formato del producto no es válido";
        }
        const cart = await cartsModel.findById(cid);
        if (cart) {
            const index = cart.products.findIndex(prod => prod.id_prod._id == pid);
            if (index!== -1) {
                const deletedProduct = cart.products[index];
                cart.products.splice(index, 1);
                await cart.save();
                return deletedProduct;
            } else {
                return "Error: El producto no existe en el carrito";
            }
        } else {
            return "Error: No se encontró el carrito";
        }
    } catch (error) {
        console.error("Error al eliminar el producto del carrito", error);
    } 
}

  async deleteAllProductsFromCart(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid});

      if (!cart) {
        return(`Carrito con ID ${cid} no encontrado.`);
      }

 
      cart.products = [];

      await cart.save();

      console.log(`Todos los productos del carrito con ID ${cid} han sido eliminados`);
      return cart;
    } catch (error) {
      console.error(`Error al eliminar todos los productos del carrito con ID ${cid}`,error);
    }
  }

  async updateCart(cid, updatedProducts) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
  
      if (!cart) {
        return(`Carrito con ID ${cid} no encontrado.`);
      }
     
      cart.products = updatedProducts;
  
      await cart.save();
  
      return cart;
    } catch (error) {
      console.error(`Error al actualizar el carrito con ID ${cid}`,error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
  
      if (!cart) {
        throw new Error(`Carrito con ID ${cid} no encontrado.`);
      }
  
      const product = cart.products.find((p) => p.id.toString() === pid.toString());
  
      if (!product) {
        throw new Error(`Producto con ID ${pid} no encontrado en el carrito.`);
      }
  
      
      if (typeof quantity !== 'number' || quantity < 0) {
        throw new Error('La cantidad debe ser un número positivo.');
      }
     
      product.quantity = quantity;
  
      await cart.save();
      console.log('Después de la actualización:', cart);
  
      return cart;
    } catch (error) {
      console.error(`Error al actualizar la cantidad del producto en el carrito`,error);
    }
  }
  async purchase(cid){
    try {

      const cart = await cartsModel.findById(cid);
      if(cart){
          if(!cart.products.length){
              return ("es necesario que agrege productos antes de realizar la compra")
          }
          const ticketProducts = [];
          const rejectedProducts = [];
          for(let i=0; i<cart.products.length;i++){
              const cartProduct = cart.products[i];
              const productDB = await productsModel.findById(cartProduct.id);
              if(cartProduct.quantity<=productDB.stock){
                  ticketProducts.push(cartProduct);
              } else {
                  rejectedProducts.push(cartProduct);
              }
          }
          console.log("ticketProducts",ticketProducts)
          console.log("rejectedProducts",rejectedProducts)
          const newTicket = {
              code:uuidv4(),
              purchase_datetime: new Date().toLocaleString(),
              amount:500,
              purchaser:req.user.email
          }
          const ticketCreated = await ticketsModel.create(newTicket);
          return ticketCreated;
      } else {
          return("el carrito no existe")
      }
  } catch (error) {
    console.error(`Error al hacer la compra`,error);
  }
  }
}

export { dbCartManager };