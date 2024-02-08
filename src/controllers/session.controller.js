import userModel from "../dao/models/users.model.js";
import { createHash, validatePassword } from "../utils.js";


async function register(req, res)  {
    res.send({status: "success", message:"Usuario registrado"})
}

async function failRegister (req, res) {
    console.log("Fallo el registro");
    res.send({error: "Fallo el registro"})
}

async function login (req,res){
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

async function gitHubCallBack(req, res){
    req.session.user = req.user;
    res.redirect("/")
}

async function restartPassword (req, res) {
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
}

export{register,failRegister,login,gitHubCallBack,restartPassword}