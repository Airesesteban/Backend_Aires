import { dbCartManager } from "../dao/managers/dbCartManager.js";

class CartsRepository {
  constructor() {
    this.cartManager = new dbCartManager();
  }

  async getCarts() {
    try {
      return await this.cartManager.getCarts();
    } catch (error) {
      console.error("Error al obtener todos los carritos", error);
      throw error; 
    }
  }

  async getCartById(id) {
    try {
      return await this.cartManager.getCartById(id);
    } catch (error) {
      console.error("Error al obtener el carrito por ID", error);
      throw error;
    }
  }

  async addCart() {
    try {
      return await this.cartManager.addCart();
    } catch (error) {
      console.error("Error al agregar un nuevo carrito", error);
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
        return await this.cartManager.addProductToCart(cid, pid, quantity);
      } catch (error) {
        console.error("Error al agregar un nuevo carrito", error);
        throw error;
      }

  }

  async deleteProductCart(cid,pid){
    try {
        return await this.cartManager.deleteProductCart(cid,pid);
      } catch (error) {
        console.error("Error al eliminar un producto del carrito", error);
        throw error;
      }

  }

  async deleteAllProductsFromCart(cid){
    try {
        return await this.cartManager.deleteAllProductsFromCart(cid);
      } catch (error) {
        console.error("Error al eliminar todos los productos del carrito", error);
        throw error;
      }

  }

  async updateCart(cid, updatedProducts) {
    try {
        return await this.cartManager.updateCart(cid, updatedProducts);
      } catch (error) {
        console.error("Error al actualizar carrito", error);
        throw error;
      }
    
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
        return await this.cartManager.updateProductQuantity(cid, pid, quantity);
      } catch (error) {
        console.error("Error al actualizar catidad del producto", error);
        throw error;
      }

  }

  async purchase(cid){
    try {
      return await this.cartManager.purchase(cid);
    } catch (error) {
      console.error("Error al comprar productos", error);
      throw error;
    }
  }

}

export default CartsRepository;