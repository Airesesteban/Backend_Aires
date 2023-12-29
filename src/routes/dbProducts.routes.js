import { Router } from "express";
import productsModel from "../dao/models/products.model.js";
import {dbProductManager} from "../dao/managers/dbProductManager.js";

const router = Router();
const productManager = new dbProductManager();

router.get("/", async (req, res)=>{
    try{
        const { limit = 10, page = 1, sort, category, status } = req.query
        const sortOption = sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null;
        const query = {};
        if (category) query.category = category;
        if (status) query.status = status;
    
        const result= await productManager.getProducts(query, { limit, page, sort: sortOption })

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/dbproducts?limit=${limit}&page=${result.prevPage}&sort=${sort}&category=${category}` : null,
            nextLink: result.hasNextPage ? `/api/dbproducts?limit=${limit}&page=${result.nextPage}&sort=${sort}&category=${category}` : null,
        };
    
        res.send({
            status: "success",
            message: response
        })
    }catch(error) {
        console.error("Error al obtener productos",error)
    }
})

router.get("/:pid", async (req, res)=>{

    const {pid} = req.params;
    try{
        const product = await productManager.getProductById(pid)
        res.send({
            status: "success",
            message: product
        })
    }catch(error){
        console.error("Error al obtener producto",error)
    }
})

router.post("/", async (req, res)=>{

    const newProduct = req.body;
   
    try{
        const result = await productManager.addProduct(newProduct);

        res.send({
            status: "success",
            message: result
        })
    }catch(error){
        console.error("Error al agregar producto".error)
    }
    
})

router.put("/:pid", async (req, res)=>{

    const {pid} = req.params;
    const updateProduct = req.body;
    try{   
        const result = await productManager.updateProduct(pid,updateProduct);
        res.send({
            status: "success",
            message: result
        })
    } catch(error){
        console.error("Error al actualizar productor".error)
    }
    
})

router.delete("/:pid", async (req, res)=>{

    const {pid} = req.params;

    try{
        const result = await productManager.deleteProduct(pid)

        res.send({
            status: "success",
            message: result
        })
    }catch(error){
        console.error("Error al eliminar productor".error)
    }
 
})

export { router as dbProductsRouters };