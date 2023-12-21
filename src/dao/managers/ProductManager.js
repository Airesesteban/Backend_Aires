import fs from 'fs';
import path from "path";
import __dirname from "../../utils.js";

class ProductManager {

    constructor( pathFile ){

        this.path = path.join(__dirname,`/files/${pathFile}`);
    }


    getProducts = async () => {

         try{ 
            if(fs.existsSync(this.path)){
                const productos = JSON.parse(await fs.promises.readFile( this.path, 'utf-8'))
                return productos
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
    
            if( !producto.title || !producto.description || !producto.price || !producto.code || !producto.stock )
        {   
            return "All fields are required. (Except thumbnails)";
        }

        const productos = await this.getProducts();

        let existe = productos.find(p => p.code == producto.code)

        if(existe){

            return "The Product Code Already Exist.";

        }else{
            
            if( productos.length === 0)
            {
                producto.id = 1;
            }else{
                producto.id = productos[ productos.length-1 ].id + 1;
            }
            
            if ( !producto.status )
            {
                producto.status = true;
            }else{    
                producto.status = producto.status;
            }
            productos.push( producto );
            await fs.promises.writeFile( this.path, JSON.stringify(productos, null, '\t') )
            return productos;
            }
        }
            catch(err) {
                return err;
            }
    }
    
    
    getProductById = async (idProduct) =>{
        const products = await this.getProducts();
        let product = products.find(product => product.id === idProduct)
       
        if(product){
            return product;
        }else{
            return ['Not found'];
        }
    }

    updateProduct = async (idProduct,product) =>{

        try{
        const products = await this.getProducts();
        const productIndice = products.findIndex(producto => producto.id == idProduct)

        if(productIndice != -1){
            products[productIndice].title = product.title;
            products[productIndice].description = product.description
            products[productIndice].price = product.price
            products[productIndice].thumbnail = product.thumbnail
            products[productIndice].code = product.code
            products[productIndice].stock = product.stock
            products[productIndice].category = product.category
            products[productIndice].status = product.status
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

        const productoIndex = productos.findIndex( p => p.id == idProduct );
        if(productoIndex != -1){
            productos.splice( productoIndex, 1);
            
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