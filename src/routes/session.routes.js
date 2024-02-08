import {Router} from    "express";
/* import userModel from "../dao/models/users.model.js";
import { createHash, validatePassword } from "../utils.js"; */
import passport from "passport";
import { register, restartPassword, gitHubCallBack, failRegister, login } from "../controllers/session.controller.js";

const router =  Router();

router.post("/register",passport.authenticate("register", {failureRedirect:"/api/session/failregister"}),register);
/* router.post("/register",passport.authenticate("register", {failureRedirect:"/api/session/failregister"}),
async (req, res) => {
    res.send({status: "success", message:"Usuario registrado"})
}
) */

router.get("/failRegister",failRegister);
/* router.get("/failRegister", async (req, res) => {
    console.log("Fallo el registro");
    res.send({error: "Fallo el registro"})
})
 */

router.post('/login',passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}),login);
/* router.post('/login',passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}),
    async (req,res)=>{
        if(!req.user){
            return res.status(400).send({status:"error"})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        res.send({status:"success", payload:req.user})
    }
) */

router.get("/faillogin", (req, res) => {
    res.send({error: "fail login"})
})

router.get("/github", passport.authenticate("github",{scope:["user:email"]}), async(req, res)=>{});

router.get("/githubcallback", passport.authenticate("github",{failureRedirect:"/login"}),gitHubCallBack);
/* router.get("/githubcallback", passport.authenticate("github",{failureRedirect:"/login"}), async(req, res)=>{
    req.session.user = req.user;
    res.redirect("/")
}); */

router.get("/logout", (req, res) =>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: "error",
                message: "No se pudo desloguear"
            })
        }
        res.redirect("/login")
    })
})

router.post("/restartPassword",restartPassword);
/* router.post("/restartPassword", async (req, res) =>{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).send({
                status: "error",
                message: "Datos incorrectos"
            })
    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send({
        status: "error",
        message: "No existe el usuario"
    })
    const newHashPassword = createHash(password);

    await userModel.updateOne({id:user.id},{$set:{password:newHashPassword}});
    res.send({
        status: "success",
        message: "Contraseña restaurada"
    })
}) */

router.get("/current", (req, res) => {
    try {
        if (req.session && req.session.user) {
            res.status(200).json({
                status: "success",
                user: req.session.user
            });
        } else {
            res.status(401).json({
                status: "error",
                message: "No hay sesión de usuario activa"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error al obtener el usuario actual"
        });
    }
});

export default router;