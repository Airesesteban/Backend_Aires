  import cartsModel from "../models/carts.model.js"; 
  import productsModel from "../models/products.model.js";
  import {v4 as uuidv4} from 'uuid';
  import ticketsModel from "../models/tickets.model.js";
  import moment from 'moment';

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
      
          if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado.`);
          }
      
          const existingProduct = cart.products.find((p) => p.product.toString() === pid.toString());
      
          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            const product = await productsModel.findOne({ _id: pid });
      
            if (!product) {
              throw new Error(`Producto con ID ${pid} no encontrado.`);
            }
      
            cart.products.push({ product: product._id, quantity });
          }
      
          return await cart.save();
      
          //return cart;
        } catch (error) {
          console.error('Error al agregar un producto al carrito en MongoDB:', error.message);
          throw error;
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
        if(cart.paid) {
          return("EL carrito ya esta pago")
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
        if(cart.paid) {
          return("EL carrito ya esta pago")
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
        
        if(cart.paid) {
          return("EL carrito ya esta pago")
        }
        
        const product = cart.products.find((p) => p._id === pid.toString());
        console.log("cart product",cart.products._id)
        console.log("pid",pid)
    
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
    async purchase(cid, req){
      try {

        const cart = await cartsModel.findOne({ id: cid });
        if(cart){
            if(!cart.products.length){
                return ("es necesario que agrege productos antes de realizar la compra")
            }
            const ticketProducts = [];
            const rejectedProducts = [];

            for(let i=0; i<cart.products.length;i++){
                const cartProduct = cart.products[i];
                console.log(`ID de Producto en el Carrito: ${cartProduct.id}`);
                const productDB = await productsModel.findById(cartProduct.product);
                console.log(productDB)
                if (!productDB) {
                  throw new Error(`Producto con ID ${cartProduct.id} no encontrado.`);
                }
                if (cartProduct.quantity <= (productDB.stock || 0)){
                    ticketProducts.push(cartProduct);
                } else {
                    rejectedProducts.push(cartProduct);
                }
            }
            console.log("ticketProducts",ticketProducts)
            console.log("rejectedProducts",rejectedProducts)

            const newTicket = {
                code:uuidv4(),
                purchase_datetime: moment().format(),
                amount:500,//total price
                purchaser: req && req.user ? req.user.email : "Usuario no disponible",
                products: ticketProducts
            }
            const ticketCreated = await ticketsModel.create(newTicket);
            cart.paid=true;
            cart.ticket = ticketCreated;
            await cart.save();
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