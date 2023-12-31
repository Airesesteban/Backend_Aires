import productsModel from "../models/products.model.js";

class dbProductManager{

    async getProducts(query, { limit, page, sort: sortOption }){
        try {
            
            if (isNaN(limit) || parseInt(limit) <= 0) {
              return "Error: 'limit' debe ser un número positivo.";
            }

          
            if (isNaN(page) || parseInt(page) <= 0) {
              return "Error: 'page' debe ser un número positivo.";
            }

            
            if (sortOption !== 'price' && sortOption !== '-price' && sortOption !== null) {
              return "Error: 'sort' debe ser 'asc', 'desc' o null.";
            }
              
          const products = await productsModel.paginate(query, { limit, page, sort: sortOption });
          return products

        }catch(error){
            console.error('Error al consultar productos desde Mongo',error);
        }
    }

    async addProduct(){
        try{
            const result = await productsModel.create(product);

            console.log("Producto agregado")
            return result;

        }catch(error){
            console.error('Error al agregar el producto',error);
        }
    }

    async getProductById(id){
        try{
            const product = await productsModel.findOne({id:id});
            return product;

        }catch(error){
            console.error('Error al obtener producto por el ID',error);
        }
    }

    async updateProduct(id, updateProduct){
        try{
            const result = await productsModel.updateOne({id:id}, {$set:updateProduct});
        }catch(error){
            console.error('Error al actualizar el producto',error)
        }
    }

    async deleteProduct(id){
        try{
            const result = await productsModel.deleteOne({id:id})

        }catch(error){
            console.error('Error al eliminar el producto',error)
        }
    }
}

export { dbProductManager };