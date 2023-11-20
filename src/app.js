import ProductManager from "./ProductManager.js";
import express from "express";

const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})


const manager = new ProductManager('./files/Productos.json');



app.get('/products',async (req,res)=>{

  try {
    const products = await manager.getProducts();
    const limit = parseInt(req.query.limit);

    if(isNaN(limit) || limit < 0){
      return res.json({products: products});
    }
    const productslimited = products.slice(0, limit);

    res.json({products: productslimited});

  }catch(err){
    return err;
  }
})

app.get('/products/:pid', async(req,res)=>{

  try{
    const products = await manager.getProducts();
    const productId = parseInt(req.params.pid);

    if(!isNaN(productId)){
      const product = products.find(product => product.id === productId);
      if (product){
        res.json({product: product});
      }else{
        res.json({ error: 'Producto no encontrado' });
      }
    }
    else{
      res.json({ error: 'ID invalido' });
    }
  }catch(err){
    return err;
  }
})