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

    updateProduct = async (idProduct)
}

//Ejemplos para hacer las pruebas

/* const productManager = new ProductManager();

productManager.addProduct('Mouse', 3520, 'Mouse Logitech', 'mouse-logitech.png', 'LogiM', 25);
productManager.addProduct('Smartphone', 220000, 'Motorla g50', 'motog50.png', 'Mg50', 18);
productManager.addProduct('Smartphone', 220000, 'Motorla g50', 'motog50.png', 'Mg50', 18);
//Traer todos los productos
console.log(productManager.getProducts()); */

// Traer productos por ID
/* console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(3));  */// Retorna "Not Found"

/*  const manager = new ProductManager();

const env = async () => {

    let primerConsulta = await manager.getProducts();
    console.log(primerConsulta);
    let product = {
        title: 'Smartphone',
        description: 'Motorla g50',
        price: 3520,
        thumbnail: 'motog50.png',
        code:'Mg50',
        stock: 18
    }
    let result = await manager.addProduct(product);
    console.log(result);
}

env() */

const manager = new ProductManager();

let result = await manager.getProductById(5);
console.log(result); 