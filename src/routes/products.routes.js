import { Router } from "express";
import { getProducts,getProductById,addProduct,updateProduct,deleteProduct} from "../controllers/products.controller.js";
import {checkRole} from "../middlewares/auth.js";
import { generateProduct } from "../utils.js";

const router = Router();

router.get("/",getProducts);
router.get("/mockingproducts", (req, res) => {
    try {
        const cant = 100;
        const products = [];
        for (let i = 0; i < cant; i++) {
            products.push(generateProduct());
        }
        res.json(products);
    } catch (error) {
        console.error("Error in /mockingproducts:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

router.get("/:pid",getProductById);
router.post("/" ,checkRole(["admin"]) ,addProduct);
router.put("/:pid",checkRole(["admin"]) ,updateProduct);
router.delete("/:pid",checkRole(["admin"]) ,deleteProduct);

export { router as productsRouter };