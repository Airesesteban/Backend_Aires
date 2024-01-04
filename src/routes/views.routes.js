import {Router} from  "express";
import { dbProductManager } from "../dao/managers/dbProductManager.js";
import {dbCartManager} from "../dao/managers/dbCartManager.js";    

const router = Router();
const productManager = new dbProductManager();
const cartManager = new dbCartManager();

router.get("/", async(req, res) => {
    try{
        const listadeproductos = await productManager.getProducts({}, { limit: 10, page: 1, sort: 'asc' });
        res.render("home",{listadeproductos})
    }catch(error){
        console.error('Error al obtener la lista de productos:', error);
    }
    
})

router.get('/dbproducts', async (req, res) => {
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
        prevLink: result.hasPrevPage ? `/dbproducts?limit=${limit}&page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/dbproducts?limit=${limit}&page=${result.nextPage}` : null,
      };
      res.render('dbproducts', { products: response });
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  })
  
  router.get('/carts/:cid', async (req, res) => {
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
  

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
    })

router.get('/chat', (req, res) => {
  res.render('chat'); 
})

export default router;