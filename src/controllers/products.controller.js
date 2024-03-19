import { ProductsService } from "../repositories/index.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customError.service.js";
import { generateAddProductError } from "../services/productError.service.js";



async function getProducts(req, res)  {
   
    try {
        const products = await ProductsService.getProducts();
        res.json(products);
      } catch (error) {
        throw CustomError.createError({name:"DatabaseError",message:"Error interno del servidor",errorCode:EError.DATABASE_ERROR, cause:error})
      }
    }

    async function getProductById (req, res){

        const {pid} = req.params;
        try{
            const product = await ProductsService.getProductById(pid)
            res.send({
                status: "success",
                message: product
            })
        }catch(error){
            console.error("Error al obtener producto",error)
        }
    }

    async function addProduct (req, res) {
        try{
            const newProduct = req.body;
            product.owner = req.user._id;
            const result = await ProductsService.addProduct(newProduct);
    
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
            const result = await ProductsService.updateProduct(pid,updateProduct);
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
        try{
            const productId = req.params;
            const product = await ProductsService.getProductById(productId);
            if(product){
                const productOwner = JSON.parse(JSON.stringify(product.owner));
                const userId = JSON.parse(JSON.stringify(req.user._id));
                if((req.user.rol === "premium" && productOwner == userId) || req.user.rol === "admin"){
                    await ProductsService.deleteProduct(productId);
                    return res.json({status:"success", message:"producto eliminado"});
                }else {
                    res.json({status:"error", message:"no tienes permiso para borrar este producto"});
                }
            }else{
                return res.json({status:"error", message:"El producto no existe"});
            }
        }catch(error){
            req.logger.info("Error al eliminar producto", error);
        }
     
    }

    export {
        getProducts,   
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct
    };