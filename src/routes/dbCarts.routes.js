import { Router } from "express";
import { dbCartManager } from "../dao/managers/dbCartmanager";

const router = Router();
const cartManager = new dbCartManager();

router.get('/:cid', async (req, res) => {

    const cid = req.params;

    const carts = await cartManager.getCartById(cid);

    res.send({
        status: "success",
        message: carts
    })
})

 router.post('/', async (req, res) => {
   
    const newCart = await cartManager.addCart();

    if (newCart){
        res.send({
            status:"succes",
            msg:"Nuevo carrito agregado"
        })
    }else{
        res.send({
            status:"error",
            msg:"Error al agregar o carrito inexistente"
        })
    }
})

router.post('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid; 
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const result = await cartManager.addProductToCart(cartId, productId,quantity);

    res.send({
        status:"succes",
        msg: result
    })
})

export {router as dbCartsRouter}