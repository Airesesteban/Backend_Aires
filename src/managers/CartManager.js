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
}

export{CartManager};