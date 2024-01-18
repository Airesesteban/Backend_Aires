import {Router} from  "express";
import { dbProductManager } from "../dao/managers/dbProductManager.js";
import {dbCartManager} from "../dao/managers/dbCartManager.js";    

const router = Router();
const productManager = new dbProductManager();
const cartManager = new dbCartManager();

const publicAccess = (req,res,next) =>{
  if(req.session.user){
      return res.redirect('/');
  }
  next();
}
const privateAccess = (req,res,next) =>{
  if(!req.session.user){
      return res.redirect('/login');
  }
  next();
}

router.get("/",privateAccess, async(req, res) => {
    try{
        const listadeproductos = await productManager.getProducts({}, { limit: 10, page: 1, sort: 'asc' });
        res.render("home",{listadeproductos}, {user:req.session.user})
    }catch(error){
        console.error('Error al obtener la lista de productos:', error);
    }
    
})

router.get('/products',privateAccess, async (req, res) => {
    try {
      const { limit = 5, page = 1,query, sort, category } = req.query;
        
      const sortOption = sort === 'desc' ? '-price' : 'price'

      const options = {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        sort: sortOption,
        lean:true,
      };
  
      const result = await productManager.getProducts(options,limit, query, category);
  
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
      console.error('Error al obtener la lista de productos:', error);
    }
  })
  
  router.get('/carts/:cid',privateAccess, async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await cartManager.getCartById(cid);
  
      if (cart) {
        res.render('cart', { cart });
      } else {
        res.send({
            status:"error",
            message: "error al obtener la lista de productos"
        })
      }
    } catch (error) {
      console.error('Error al obtener detalles del carrito:', error);
    }
})
  

router.get("/realtimeproducts",publicAccess,(req,res)=>{
    res.render("realtimeproducts")
    })

router.get('/chat',publicAccess, (req, res) => {
  res.render('chat'); 
})

router.get("/register",publicAccess, (req, res) => {
  res.render('register');
})

router.get("/login", publicAccess, (req, res) => {
    res.render('login');
})

router.get("/resetPassword", (req, res) => {
  res.render('resetPassword');
})


export default router;