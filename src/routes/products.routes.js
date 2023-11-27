import { Router } from "express";
import {ProductManager } from "../managers/ProductManager.js";

const path = "Productos.json"
const router = Router();
const productManager = new ProductManager(path);

router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
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
    
      }catch(err){
        return err;
      }
})

router.get('/:pid', async (req, res) => {

    try{
        const products = await manager.getProducts();
        const productId = parseInt(req.params.pid);
    
        if(!isNaN(productId)){
          const product = products.find(product => product.id === productId);
          if (product){
            res.send({
                status:"succes",
                producto: product
            })
          }else{
            res.send({
                status:"error",
                error: "Producto no encontrado"
            })
          }
        }
        else{
            res.send({
                status:"error",
                error: "ID Inválido"
            })
        }
      }catch(err){
        return err;
      }
})

router.post('/', async (req, res) => {
    const product = req.body;
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

router.delete('/', async (req, res) => {
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