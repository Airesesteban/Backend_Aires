import productsModel from "../dao/models/products.model.js";

class dbProductManager{

    async getProducts(){
        try{
            const products = await productsModel.find();
            return products;

        }catch(error){
            console.error('Error al consultar productos desde Mongo');
        }
    }

    async addProduct(){
        try{
            const result = await productsModel.create(product);

            console.log("Producto agregado")
            return result;

        }catch(error){
            console.error('Error al agregar el producto');
        }
    }

    async getProductById(id){
        try{
            const product = await productsModel.findOne({id:id});
            return product;

        }catch(error){
            console.error('Error al obtener producto por el ID');
        }
    }

    async updateProduct(id, updateProduct){
        try{
            const result = await productsModel.updateOne({id:id}, {$set:updateProduct});
        }catch(error){
            console.error('Error al actualizar el producto')
        }
    }

    async deleteProduct(id){
        try{
            const result = await productsModel.deleteOne({id:id})

        }catch(error){
            console.error('Error al eliminar el producto')
        }
    }
}

export { dbProductManager };