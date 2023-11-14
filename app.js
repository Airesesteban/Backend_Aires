import ProductManager from "./ProductManager.js";


const manager = new ProductManager('./files/Productos.json');

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

/* let result = await manager.deleteProduct(1);
console.log(result); */

env();  
