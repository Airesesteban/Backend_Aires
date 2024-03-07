import CartsRepository from "../repositories/carts.repository.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customError.service.js";
import { generateAddCartError } from "../services/cartError.service.js";

const cartsRepository = new CartsRepository();

async function getCartById(req, res)  {

    const cid = req.params.cid;

    const cart = await cartsRepository.getCartById(cid);

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
   
    const newCart = await cartsRepository.addCart();

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

    const result = await cartsRepository.addProductToCart(cid, pid,quantity);

    res.send({
        status:"succes",
        msg: result
    })
}

async function deleteProductCart (req,res) {
    const {cid,pid}=req.params

    try {
        const result = await cartsRepository.deleteProductCart(cid,pid)
            res.send({
                status:"succes",
                msg: result
            })
      } catch (error) {
        req.logger.info("Error al eliminar", error);
        //console.error("Error al eliminar", error);
    }
}

async function deleteAllProductsFromCart (req, res) {
    const { cid } = req.params;
  
    try {
      const cart = await cartsRepository.deleteAllProductsFromCart({ id: cid });
  
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
        const result = await cartsRepository.updateProductQuantity(cid, pid, quantity);

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
    const result = await cartsRepository.updateCart(cid, updatedProducts);
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
    const result = await cartsRepository.purchase(cid, req);
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