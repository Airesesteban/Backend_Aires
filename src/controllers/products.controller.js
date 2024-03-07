import ProductsRepository from "../repositories/products.repository.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customError.service.js";
import { generateAddProductError } from "../services/productError.service.js";


const productsRepository = new ProductsRepository();

async function getProducts(req, res)  {
   
    try {
        const products = await productsRepository.getProducts();
        res.json(products);
      } catch (error) {
        throw CustomError.createError({name:"DatabaseError",message:"Error interno del servidor",errorCode:EError.DATABASE_ERROR, cause:error})
      }
    }

    async function getProductById (req, res){

        const {pid} = req.params;
        try{
            const product = await productsRepository.getProductById(pid)
            res.send({
                status: "success",
                message: product
            })
        }catch(error){
            console.error("Error al obtener producto",error)
        }
    }

    async function addProduct (req, res) {

        const newProduct = req.body;
       
        try{
            const result = await productsRepository.addProduct(newProduct);
    
            res.send({
                status: "success",
                message: result
            })
        }catch(error){
            CustomError.createError({
                name:"Product Creation Error",
                cause:generateAddProductError,
                message:"Error al agregar producto",
                errorCode:EError.PRODUCT_CREATION_ERROR
            })
        }
        
    }

    async function updateProduct (req, res) {

        const {pid} = req.params;
        const updateProduct = req.body;
        try{   
            const result = await productsRepository.updateProduct(pid,updateProduct);
            res.send({
                status: "success",
                message: result
            })
        } catch(error){
            req.logger.info("Error al actualizar producto", error);
            //console.error("Error al actualizar productor".error)
        }
        
    }

    async function deleteProduct (req, res) {

        const {pid} = req.params;
    
        try{
            const result = await productsRepository.deleteProduct(pid)
    
            res.send({
                status: "success",
                message: result
            })
        }catch(error){
            req.logger.info("Error al eliminar producto", error);
            //console.error("Error al eliminar productor".error)
        }
     
    }

    export {
        getProducts,   
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct
    };