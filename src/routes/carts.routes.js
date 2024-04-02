import { Router } from "express";
import { getCartById,addCart,addProductToCart,deleteProductCart,deleteAllProductsFromCart,updateProductQuantity,updateCart,purchase } from "../controllers/carts.controller.js";
import passport from "passport";

const router = Router();

router.get('/:cid',getCartById);
router.post('/',addCart);
router.post('/:cid/product/:pid',addProductToCart);
router.delete('/:cid/product/:pid', deleteProductCart);
router.delete("/:cid",deleteAllProductsFromCart);
router.put('/:cid/product/:pid',updateProductQuantity);
router.put('/:cid',updateCart);
router.post('/:cid/purchase',purchase);

export {router as cartsRouter}