import {Router} from  "express";
import { detalleCarrito, listaProductos, productos } from "../controllers/views.controller.js";

const router = Router();

const publicAccess = (req,res,next) =>{
  if(req.session?.user){
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

router.get("/",privateAccess,listaProductos);

router.get('/products',privateAccess,productos);

router.get('/carts/:cid',privateAccess,detalleCarrito);  

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