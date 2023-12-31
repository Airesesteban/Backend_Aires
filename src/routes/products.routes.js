import { Router } from "express";
import {ProductManager } from "../dao/managers/ProductManager.js";

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

        const productId = req.params.pid;
        let products = await productManager.getProductById(parseInt(productId));

        res.send({
            status:"succes",
            producto: products
        })
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
    const product = req.body;

    const pActualizado = await productManager.updateProduct(pid,product);
    
    res.send({
        status:"succes",
        msg: pActualizado
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productConfirm = await productManager.deleteProduct(pid)

    res.send({
        status:"succes",
        msg:`Producto con ID: ${pid} eliminado correctamente`
    })
})

export {router as productRouter}