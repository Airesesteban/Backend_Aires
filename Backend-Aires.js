class   ProductManager {

    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,code,stock) {

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

    }
    
    
    getProductById(idProduct) {
        let product = this.products.find(product => product.id == idProduct)
        if(product){
            return product;
        }else{
            return ['Not found'];
        }
    }
}

/* Ejemplos para hacer las pruebas

const productManager = new ProductManager();

productManager.addProduct('Mouse', 3520, 'Mouse Logitech', 'mouse-logitech.png', 'LogiM', 25);
productManager.addProduct('Smartphone', 220000, 'Motorla g50', 'motog50.png', 'Mg50', 18);
productManager.addProduct('Smartphone', 220000, 'Motorla g50', 'motog50.png', 'Mg50', 18);
//Traer todos los productos
console.log(productManager.getProducts());

// Traer productos por ID
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(3)); // Retorna "Not Found" */
