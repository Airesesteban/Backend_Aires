import express from 'express';
import { generateProduct } from "../utils.js";

const router = express.Router();

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

export default router;