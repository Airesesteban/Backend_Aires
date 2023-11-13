import fs from 'fs';

const path = './files/Productos.json'

class   ProductManager {


    getProducts = async () => {
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf8');
            const products = JSON.parse(data);
            return products
        }else{
            return [];
        }
    }
   
    addProduct = async (producto) => {

        const products = await this.getProducts();
        if (products.length === 0){
            producto.id = 1
        }else{
            producto.id = products[products.length-1].id+1;
        }
        products.push(producto);
        await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'))
        return products;
    }

    /* addProduct(title,description,price,thumbnail,code,stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('All fields are required');
            return;
          }

        if (this.products.find(product => product.code === code)) {
            console.log('Product with this code already exists');
            return;
          }
          
        let id_product = this.products.length;

        let product ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ++id_product
        }
    this.products.push(product);

    return this.products;

    } */
    
    
    getProductById = async (idProduct) =>{
        const products = await this.getProducts();

        let product = products.find(producto => producto.id == idProduct)
        if(product){
            return product;
        }else{
            return ['Not found'];
        }
    }

    updateProduct = async (idProduct,nombre) =>{
        const products = await this.getProducts();
        let indice = products.findIndex(producto => producto.id == idProduct)
        if(indice != -1){
            products[indice].title = nombre;
        }else{
            return ['Not found'];
        }
        await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'))
        return products;
    }

    deleteProduct = async (idProduct) =>{
        const products = await this.getProducts();

        let product = products.find(producto => producto.id == idProduct)
        if(product){
            products.splice((idProduct-1), 1);
            
        }else{
            return ['Not found'];
        }
        await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'))
        return products;
    }
}

// Anotaciones para ahcer las pruebas

/*   const manager = new ProductManager();

 const env = async () => {
 
     let primerConsulta = await manager.getProducts();
    console.log(primerConsulta);  
    let product = {
        title: 'Radio',
        description: 'fm',
        price: 1000,
        thumbnail: 'radiofm.png',
        code:'RFM',
        stock: 36
    }
    let result = await manager.addProduct(product);
    console.log(result);
} 

env()  */

/* const manager = new ProductManager();

let result = await manager.updateProduct(1,"SUperMouseSS");
console.log(result);  */