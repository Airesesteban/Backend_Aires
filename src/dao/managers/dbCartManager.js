import cartsModel from "../models/carts.model.js"; 

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
            const cart = await cartsModel.findOne({ id: cid });



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
        const cart = await cartModel.findById(cid);
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
      const cart = await cartModel.findOne({ id: cid});

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
      const cart = await cartModel.findOne({ id: cid });
  
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
      const cart = await cartsModel.findOne({ id: cid });
  
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

}


export { dbCartManager };