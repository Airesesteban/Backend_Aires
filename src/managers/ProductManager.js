import fs from 'fs';
import path from "path";
import __dirname from "../utils.js";

class ProductManager {

    constructor( pathFile ){

        this.path = path.join(__dirname,`/files/${pathFile}`);
    }


    getProducts = async () => {

         try{ 
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf8');
                const products = JSON.parse(data);
                return products
            }else{
                return ('Not found');
            }
         }
        catch(err){
            return err;
        }   
    }
   
    addProduct = async (producto) => {
        try{ 
    
            if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                return('All fields are required');
              }
              
            const products = await this.getProducts();
            
            if (products.find(product => product.code === producto.code)) {
                return('Product with this code already exists');
                
              }
    
            if (products.length === 0){
                producto.id = 1
            }else{
                producto.id = products[products.length-1].id+1;
            }
            products.push(producto);
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
            return products;
            }
            catch(err) {
                return err;
            }
        }
    
    getProductById = async (idProduct) =>{
        const products = await this.getProducts();

        let product = products.find(producto => producto.id == idProduct)
        if(product){
            return product;
        }else{
            return ['Not found'];
        }
    }

    updateProduct = async (idProduct,product) =>{

        try{
        const products = await this.getProducts();
        let indice = products.findIndex(producto => producto.id == idProduct)
        if(indice != -1){
            products[indice].title = product.title;
            products[indice].description = product.description
            products[indice].price = product.price
            products[indice].thumbnail = product.thumbnail
            products[indice].code = product.code
            products[indice].stock = product.stock
            products[indice].category = product.category
        }else{
            return ['Not found'];
        }
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
        return products;
        }
        catch(err) {
            return err;
        }
    }

    deleteProduct = async (idProduct) =>{
        
    try {  
        const products = await this.getProducts();

        let product = products.find(producto => producto.id == idProduct)
        if(product){
            products.splice((idProduct-1), 1);
            
        }else{
            return ['Not found'];
        }
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
        return products;
    }catch(err) {
        return err;
    } 
    }       

}

export {ProductManager};