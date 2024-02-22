import { dbProductManager } from "../dao/managers/dbProductManager.js";

class ProductsRepository {
  constructor() {
    this.productManager = new dbProductManager();
  }

  async getProducts(options, query, category, sortOrder) {
    try {
      return await this.productManager.getProducts(options, query, category, sortOrder);
    } catch (error) {
      console.error("Error al obtener productos", error);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      return await this.productManager.addProduct(product);
    } catch (error) {
      console.error("Error al agregar el producto", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.productManager.getProductById(id);
    } catch (error) {
      console.error("Error al obtener el producto por ID", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      return await this.productManager.updateProduct(id, updatedProduct);
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productManager.deleteProduct(id);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      throw error;
    }
  }
}

export default ProductsRepository;