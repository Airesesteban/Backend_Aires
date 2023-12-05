import {Router} from  "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager('src/files/Productos.json');
const router = Router();

router.get("/", async(req, res) => {
    const listadeproductos = await productManager.getProducts();
    res.render("home",{listadeproductos})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
    })

export default router;