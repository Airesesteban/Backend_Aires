import { Router } from "express";
import productsModel from "../dao/models/products.model.js";
import {dbProductManager} from "../dao/managers/dbProductManager.js";

const router = Router();
const productManager = new dbProductManager();

router.get("/", async (req, res)=>{

    const products = await productManager.getProducts();

    res.send({
        status: "success",
        message: products
    })
})

router.get("/:pid", async (req, res)=>{

         id = req.params.pid;

    const products = await productManager.getProductById(id)

    res.send({
        status: "success",
        message: products
    })
})

router.post("/", async (req, res)=>{

    const newProduct = req.body;
    
    const result = await productManager.addProduct(newProduct);

    res.send({
        status: "success",
        message: result
    })
})

router.put("/:pid", async (req, res)=>{

    const id = req.params.pid;

    const updateProduct = req.body;

    const result = await productManager.updateProduct(id,updateProduct);


    res.send({
        status: "success",
        message: result
    })
})

router.delete("/:pid", async (req, res)=>{

    const id = req.params.pid;
    const result = await productManager.deleteProduct(id)

    res.send({
        status: "success",
        message: result
    })
})

export { router as dbProductsRouters };