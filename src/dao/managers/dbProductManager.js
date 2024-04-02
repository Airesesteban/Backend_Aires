import productsModel from "../models/products.model.js";

class dbProductManager{
      async getProducts(options, query, category, sortOrder) {
        try {
          let filtro = {};
    
          if (query) {
            filtro.$or = [
              { title: { $regex: new RegExp(query, 'i') } },
              { description: { $regex: new RegExp(query, 'i') } },
              { $text: { $search: query } }
            ];
          }
    
          if (category) {
            filtro.category = category;
          }
    
          const sortOption = sortOrder === 'desc' ? { price: -1 } : { price: 1 };
    
          const paginacion = await productsModel.paginate(filtro, { ...options, sort: sortOption });
    
          return paginacion;
        } catch (error) {
          console.error('Error al obtener productos desde MongoDB:', error.message);
          throw error;
        }
      } 
     /*  async getProducts (limit, page, sort, query) {
      
        
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            lean: true,
            sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : null
        };

        let filter = {};
        if (query) {
          filter = {
              $or: [
                  { title: { $regex: query, $options: 'i' } },
                  { category: { $regex: query, $options: 'i' } },
                  { status: query.toLowerCase() === 'true' }
              ]
          };
      }


        const result = await productsModel.paginate(filter, options);
        return result;
       
    }
 */
   
    async addProduct(product){
        try{
            const result = await productsModel.create(product);

            return result;

        }catch(error){
            console.error('Error al agregar el producto',error);
        }
    }

    async getProductById(id){
        try{
            const product = await productsModel.findOne({_id:id});
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
            const result = await productsModel.deleteOne({_id:id})

        }catch(error){
            console.error('Error al eliminar el producto',error)
        }
    }
}

export { dbProductManager };