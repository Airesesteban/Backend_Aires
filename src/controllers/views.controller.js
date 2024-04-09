import { dbProductManager } from "../dao/managers/dbProductManager.js";
import {dbCartManager} from "../dao/managers/dbCartManager.js"; 
import { getAllUsers } from "./users.controller.js";   


const productManager = new dbProductManager();
const cartManager = new dbCartManager();

async function listaProductos (req, res)  {
    try{
        const listadeproductos = await productManager.getProducts({}, { limit: 10, page: 1, sort: 'asc' });
        res.render("home",{listadeproductos}, {user:req.session.user})
    }catch(error){
        console.error('Error al obtener la lista de productos:', error);
    }
    
}

async function productos (req, res)  {
    try {
      const { limit = 5, page = 1, order, category } = req.query;
  
      
      const options = {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        sort: order === 'desc' ? { price: -1 } : { price: 1 },
        lean: true
      };
  
      const result = await productManager.getProducts(options, null, category);
  
      const response = {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}` : null,
      };
      res.render('products', { products: response, user: req.session.user });
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  }

  async function detalleCarrito(req, res)  {
    const { cid } = req.params;
  
    try {
      const cart = await cartManager.getCartById(cid);
      if (cart) {
        res.render('cart',  { cart });
      } else {
        res.send({
            status:"error",
            message: "error al obtener la lista de productos"
        })
      }
    } catch (error) {
      console.error('Error al obtener detalles del carrito:', error);
    }
}

async function usuarios (req, res)  {
  try {
    const result = await getAllUsers();

    res.render('users', { users: result, user: req.session.user });
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}


export{ listaProductos, productos, detalleCarrito, usuarios };