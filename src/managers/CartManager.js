import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

class CartManager {
    constructor(pathFile){
        this.path =path.join(__dirname,`/files/${pathFile}`);
    }

    getCarts = async () => {

        try{ 
           if(fs.existsSync(this.path)){
               const data = await fs.promises.readFile(this.path, 'utf8');
               const carts = JSON.parse(data);
               return carts;
           }else{
               return ('Not found');
           }
        }
       catch(err){
           return err;
       }   
   }

   getCartById = async (idCart) =>{
    const carts = await this.getCarts();

    let cart = carts.find(carro => carro.id == idCart)
    if(cart){
        return cart;
    }else{
        return ['Not found'];
    }
}

   addCart = async () => {
    try{
        const carts = await this.getCarts();
        const newCart = {
            id,
            products: cartData.products || []
        };  

        if (carts.length === 0){
            cart.id = 1
        }else{
            cart.id = carts[carts.length-1].id+1;
        }
        carts.push(cart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'))
        return carts;
        }
        catch(err) {
            return err;
        }
    }

    addProductToCart = async (idCart,idProduct) =>{

        try{
        const carts = await this.getCarts();
        let cartIndex = carts.findIndex(cart => cart.id == idCart)
        
        if(cartIndex === -1){
            return ['Not found'];
        }

        const productIndex = carts[cartIndex].products.findIndex(product => product.id === idProduct);

        if(productIndex === -1){
            carts[cartIndex].products.push({id: idProduct, quantity});
        }else{
            carts[cartIndex].products[productIndex].quantity += 1 ;
        }

        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'))
        return carts;
        }
        catch(err) {
            return err;
        }
    }
   
}

export{CartManager};