import userModel from "../dao/models/users.model.js";
import { GetUserDto } from "../dao/dto/user.dto.js";
import { emailSender } from "../helpers/gmail.js";

async function changeRol (req,res) {
    try {  
        const userId =req.params.uid;
        const user = await userModel.findById(userId);
        const userRol= user.roles;
        if(userRol === "usuario"){
            user.roles = "premium"
        } else if(userRol === "premium"){
            user.roles = "usuario"
        }else{
            return res.json({status:"error", message:"No es posible cambiar el rol"})
        }
        await userModel.updateOne({_id:user._id},user);
        emailSender (user.email,"cambioDeRol",user.roles);
        res.send({status:"success", message:"Rol modificado"});  
        
    } catch (error) {
       console.log(error.message);
       res.json({status:"error", message:"Hubo un error al cambiar el rol"}) 
    }
}

async function getAllUsers(req, res) {
    try {
        const usuarios = await userModel.find();
        const usuariosDTO = [];

        for(const usuario of usuarios) {
            const usuarioDTO = new GetUserDto(usuario);
            usuariosDTO.push(usuarioDTO);
        }
        return usuariosDTO
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

async function deleteInactiveUsers(req, res) {
    try {
        const currentTime = new Date();
        const last2Days = new Date(currentTime.getTime() - (2*24*60*60*1000));

        const eliminacion = await userModel.deleteMany({ last_connection: { $lt: last2Days } });
        
        for(const user of eliminacion) {
            emailSender(user.email,"UsuarioEliminado");
        };

        res.send({status:"success", message:`usuarios eliminados ${eliminacion.deletedCount}`});
    } catch (error) {
        req.logger.info("Error al eliminar usuarios inactivos", error);
    }
}

async function deleteUser(req, res) {
    try {
        const user = await userModel.findById(req.params.uid);
        if(user.roles === "admin"){
           throw new Error("No puedes eliminar un admin");
        }
        await userModel.deleteOne({ _id: req.params.uid });
        emailSender(user.email,"UsuarioEliminado");
        res.send({status:"success", message:`usuario ${req.params.uid} eliminado `});
    } catch (error) {
        req.logger.error("Error al eliminar usuario", error.message);
    }
}

async function getUserCart(req, res) {
    try {
        const userId =req.params.uid;
        const userCart = (await userModel.findById(userId)).cart;

        res.send({status:"success", message: userCart})
    } catch (error) {
        console.error("Error al obtener el carrito", error);
    }
}



export {changeRol, getAllUsers, deleteInactiveUsers, deleteUser, getUserCart}