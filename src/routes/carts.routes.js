import { Router } from "express";
import {CartManager } from "../managers/CartManager.js";

const path = "Cart.json"
const router = Router();
const cartManager = new CartManager(path);

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const carts = await cartManager.getCartById(cartId);

    if(!isNaN(cartId)){
        const cart = carts.find(cart => cart.id === cartId);
        if (cart){
            res.send({
                status:"succes",
                carro: cart
            })
        }else{
          res.send({
              status:"error",
              error: "Carrito no encontrado"
          })
        }
    }
})

router.post('/', async (req, res) => {
    const cartData = req.body;
    const newCart = await cartManager.addCart(CartData);

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
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const newProduct = await cartManager.addProductToCart(cartId, productId);

    if(newProduct){
    res.send({
        status:"succes",
        msg:`Se agrego producto ${pid} al carrito ${cid}`
    })
    }else{
        res.send({
            status:"error",
            msg:"Error al agregar el producto al carrito"
        })
    }
})

export {router as cartRouter}