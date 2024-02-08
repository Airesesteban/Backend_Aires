import { dbCartManager } from "../dao/managers/dbCartManager.js";
import cartsModel from "../dao/models/carts.model.js";


const cartManager = new dbCartManager();

async function getCartById(req, res)  {

    const cid = req.params.cid;

    const cart = await cartsModel
      .findOne({ id: cid })
      .populate('products.product');

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
   
    const newCart = await cartManager.addCart();

    if (newCart){
        res.send({
            status:"succes",
            msg:"Nuevo carrito agregado"
        })
    }else{
        res.send({
            status:"error",
            msg:"Error al agregar o carrito inexistente"
        })
    }
}

async function addProductToCart (req,res) {
    const cid = req.params.cid; 
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const result = await cartManager.addProductToCart(cid, pid,quantity);

    res.send({
        status:"succes",
        msg: result
    })
}

async function deleteProductCart (req,res) {
    const {cid,pid}=req.params

    try {
        const result = await cartManager.deleteProductCart(cid,pid)
            res.send({
                status:"succes",
                msg: result
            })
      } catch (error) {
        console.error("Error al eliminar", error);
    }
}

async function deleteAllProductsFromCart (req, res) {
    const { cid } = req.params;
  
    try {
      const cart = await cartManager.deleteAllProductsFromCart({ id: cid });
  
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
        console.error("Error al eliminar", error);
    }
  }

  async function updateProductQuantity (req,res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const result = await cartManager.updateProductQuantity(cid, pid, quantity);

        res.send({
            status:"succes",
            msg: result
        })
    } catch (error) {
        console.error("Error", error);
  }
}

async function updateCart (req,res) {
    const { cid } = req.params;
    const updatedProducts = req.body;

  try {
    const result = await cartManager.updateCart(cid, updatedProducts);
    res.send({
        status:"succes",
        msg: result
    })
  } catch (error) {
    console.error("Error al agregar", error);
  }
}

export {
    getCartById,
    addCart,
    addProductToCart,
    deleteProductCart,
    deleteAllProductsFromCart,
    updateProductQuantity,
    updateCart
};