import { Router } from "express";
import { getProducts,getProductById,addProduct,updateProduct,deleteProduct} from "../controllers/products.controller.js";
import {checkRole} from "../middlewares/auth.js";

const router = Router();

router.get("/",getProducts);
router.get("/:pid",getProductById);
router.post("/" , checkRole(["admin","premium"]),addProduct);
router.put("/:pid",checkRole(["admin"]) ,updateProduct);
router.delete("/:pid",checkRole(["admin","premium"]) ,deleteProduct);

export { router as productsRouter };