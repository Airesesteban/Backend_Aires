import {Router} from    "express";
import passport from "passport";
import { register, restartPassword, gitHubCallBack, failRegister, login } from "../controllers/session.controller.js";
import { GetUserDto }   from "../dao/dto/user.dto.js";

const router =  Router();

router.post("/register",passport.authenticate("register", {failureRedirect:"/api/session/failregister"}),register);


router.get("/failRegister",failRegister);


router.post('/login',passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}),login);


router.get("/faillogin", (req, res) => {
    res.send({error: "fail login"})
})

router.get("/github", passport.authenticate("github",{scope:["user:email"]}), async(req, res)=>{});

router.get("/githubcallback", passport.authenticate("github",{failureRedirect:"/login"}),gitHubCallBack);


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


router.get("/current", (req, res) => {
    try {
        if (req.session && req.session.user) {
            const userDto = new GetUserDto(req.session.user);
            res.status(200).json({
                status: "success",
                user: userDto,
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