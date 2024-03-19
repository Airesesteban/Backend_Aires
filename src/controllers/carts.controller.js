import { CartsService } from "../repositories/index.js";
import { ProductsService } from "../repositories/index.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customError.service.js";
import { generateAddCartError } from "../services/cartError.service.js";


async function getCartById(req, res)  {

    const cid = req.params.cid;

    const cart = await CartsService.getCartById(cid);

    if (cart) {
        res.send({
            status: "success",
            message: cart
        })
    } else {
        res.send({
            status: "error",
            message: "Carrito no encontrado"
        })
    }
}

async function addCart (req, res) {

    const newCart = await CartsService.addCart();

    if (newCart){
        res.send({
            status:"succes",
            msg:"Nuevo carrito agregado"
        })
    }else{
        CustomError.createError({
            name:"Cart Creation Error",
            cause: generateAddCartError,
            message:"Error creando el carrito o inexistente",
            errorCode:EError.CART_CREATION_ERROR
        });
    }
}

async function addProductToCart (req,res) {
    const cid = req.params.cid; 
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const isPremium = req.user.premium;

    try {
        if (isPremium){
            const product = await ProductsService.getProductById(pid);
            if(product.owner === req.user.id){
                res.send({
                    status:"error",
                    msg:"No puedes agregar tu propio producto al carrito"
                })
            }
        }
        const result = await CartsService.addProductToCart(cid, pid,quantity);

        res.send({
            status:"succes",
            msg: result
        })
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status.json({ status: "error", message: "Error al agregar producto al carrito" }); 
    }
}

async function deleteProductCart (req,res) {
    const {cid,pid}=req.params

    try {
        const result = await CartsService.deleteProductCart(cid,pid)
            res.send({
                status:"succes",
                msg: result
            })
      } catch (error) {
        req.logger.info("Error al eliminar", error);
    }
}

async function deleteAllProductsFromCart (req, res) {
    const { cid } = req.params;
  
    try {
      const cart = await CartsService.deleteAllProductsFromCart({ id: cid });
  
      if (cart) {
        res.send({
            status:"succes",
            msg: cart
        })
      } else {
        res.send({
            status:"error",
            msg: cart
        })
      }
    } catch (error) {
        req.logger.info("Error al eliminar", error);
    }
  }

  async function updateProductQuantity (req,res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const result = await CartsService.updateProductQuantity(cid, pid, quantity);

        res.send({
            status:"succes",
            msg: result
        })
    } catch (error) {
        req.logger.warning("Error", error);
  }
}

async function updateCart (req,res) {
    const { cid } = req.params;
    const updatedProducts = req.body;

  try {
    const result = await CartsService.updateCart(cid, updatedProducts);
    res.send({
        status:"succes",
        msg: result
    })
  } catch (error) {
    req.logger.info("Error al actualizar", error);
    //console.error("Error al actualizar", error);
  }
}

async function purchase (req,res) {
    const cid = req.params.cid;
  
  try {
    const result = await CartsService.purchase(cid, req);
    res.send({
        status:"succes",
        msg: result
    })
  } catch (error) {
    req.logger.info("Error al comprar", error);
    //console.error("Error al comprar", error);
  }
}

export {
    getCartById,
    addCart,
    addProductToCart,
    deleteProductCart,
    deleteAllProductsFromCart,
    updateProductQuantity,
    updateCart,
    purchase
};