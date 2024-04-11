import { ProductsService } from "../repositories/index.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customError.service.js";
import { generateAddProductError } from "../services/productError.service.js";
import { emailSender } from "../helpers/gmail.js";



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
            if(product){
            res.send({
                status: "success",
                message: product
            })
            }else{
                res.send({status: "error",errorCode:404, message: "Producto no encontrado"})
            }
        }catch(error){
            console.error("Error al obtener producto",error)
        }
    }

    async function addProduct (req, res) {
        try{
            const newProduct = req.body;
           // newProduct.owner = req.user._id;
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
        }
        
    }

    async function deleteProduct (req, res) {
        try{
            const {pid} = req.params;
            const product = await ProductsService.getProductById(pid);
            if(product){
                if(product.owner == req.session.user._id || req.session.user.roles =="admin") {
                    await ProductsService.deleteProduct(pid);
                    if(req.session.user.roles == "premium"){
                       await emailSender(req.session.user.email,"productoEliminado")
                    }
                    return res.json({status:"success", message:"producto eliminado"});
                }else {
                    res.status(401);
                    res.json({status:"error", message:"no tienes permiso para borrar este producto"});
                }
            }else{
                res.status(404);
                return res.json({status:"error", message:"El producto no existe"});
            }
        }catch(error){
            res.status(500).send("Error al eliminar producto");
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