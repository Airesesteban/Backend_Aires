import { Router } from "express";
import {ProductManager } from "../managers/ProductManager.js";

const path = "Productos.json"
const router = Router();
const productManager = new ProductManager(path);

router.get('/', async (req, res) => {

    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    
    if(isNaN(limit) || limit < 0){
        return res.send({
         status:"succes",
        productos: products
    })
    }
        
    const productslimited = products.slice(0, limit);
    
    res.send({
        status:"succes",
        productos: productslimited
    })
})

router.get('/:pid', async (req, res) => {

        const productId = req.params
        const products = await productManager.getProductById(parseInt(productId));

          if (products){
            res.send({
                status:"succes",
                producto: products
            })
          }else{
            res.send({
                status:"error",
                error: "Producto no encontrado"
            })
          }
})

router.post('/', async (req, res) => {
    const product = req.body;

    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        return res.status(400).send('All fields are required');
    }
    const products = await productManager.addProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
    
})

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const pActualizado = await productManager.updateProduct(pid,req.body);
    
    if(pActualizado){
    res.send({
        status:"succes",
        msg:`Producto con ID: ${pid} actualizado correctamente`
    })
    }else{
        return res.send({
            status:"error",
            error:"Producto no encontrado"
        })
        }
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productConfirm = await productManager.deleteProduct(pid)

    if(productConfirm){
    res.send({
        status:"succes",
        msg:`Producto con ID: ${pid} eliminado correctamente`
    })
    }else{
        return res.send({
            status:"error",
            error:"Producto no encontrado"
        })
    }
})

export {router as productRouter}