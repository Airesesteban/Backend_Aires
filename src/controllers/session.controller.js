import userModel from "../dao/models/users.model.js";
import { createHash, validatePassword } from "../utils.js";
import { emailSender } from "../helpers/gmail.js";
import { sendRecoveryPass,  } from "../helpers/gmail.js";
import { generateEmailToken, verifyEmailToken } from "../utils.js";
import moment from "moment";


async function register(req, res)  {
    const respond = emailSender("airesesteban@gmail.com",'registro')
    console.log(respond);
    
    res.send({
        status:"success",
        message:"Registro exitoso"
    });
}

async function failRegister (req, res) {
    req.logger.http("Fallo en el registro", error);
    res.send({error: "Fallo el registro"})
}

async function login (req,res){
    if(!req.user){
        return res.status(400).send({status:"error"})
    }
    req.session.user = {
        _id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        roles: req.user.roles,
        
    }
    const last_connection = moment().format();
    await userModel.updateOne({_id:req.user._id},{$set:{last_connection}});
    res.send({status:"success", payload:req.user})
}

async function gitHubCallBack(req, res){
    req.session.user = req.user;
    res.redirect("/")
}

async function restartPassword (req, res) {
  
  try {
    const token = req.query.token;

        const {email, newPassword} = req.body;

        const validToken = verifyEmailToken(token);

        if(!validToken){
            return res.send(`El token ya no es valido`);
        }
        const user = await userModel.findOne({email});

        if(!user){
            return res.send("el Usuario no esta registrado")   
        }

        if(validatePassword(newPassword,user)){
            return res.send("no se puede usar la misma contraseña")
        }
        const userData = {
            ...user._doc,
            password:createHash(newPassword)
        }
        const updateUser = await userModel.findOneAndUpdate({email},userData);

        res.render("login", {message:"Contraseña actualizada"})
    
  } catch (error) {
    console.log(error);
        res.send(`<div>Error, contectese con el administrador.</div>`)
  }
  
  
    /*   const {email,password} = req.body;
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
    }) */
}

async function forgotPassword (req,res){
    try {
        const {email} = req.body;
        console.log(email);
        const user = await userModel.find({email: email});

        if(!user){
            res.send(`<div>Error no existe el usuario, por favor vuelva a intentar: <a href="/forgotPassword">Intente de nuevo</a></div>`)
        }

        const token= generateEmailToken(email, 10);
        await sendRecoveryPass(email, token);
        res.send({status: 'success', message: "Se envio el correo de recuperacion de contraseña"});

    } catch (error) {
       res.send(`<div>Error,<a href="/forgotPassword">Intente de nuevo</a></div>`) 
    }
}

export{register,failRegister,login,gitHubCallBack,restartPassword,forgotPassword}