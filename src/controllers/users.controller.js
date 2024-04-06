import userModel from "../dao/models/users.model.js";
import { GetUserDto } from "../dao/dto/user.dto.js";

class UserController{
    static changeRol= async(req,res)=>{
        try {  
            const userId =req.params.id;
            const user = await userModel.findById(userId);
            const userRol= user.roles;
            if(userRol === "usuario"){
                user.roles = "premium"
            } else if(userRol === "premium"){
                user.rol = "usuario"
            }else{
                return res.json({status:"error", message:"No es posible cambiar el rol"})
            }
            await userModel.updateOne({_id:user._id},user);
            res.send({status:"success", message:"Rol modificado"});  
            
        } catch (error) {
           console.log(error.message);
           res.json({status:"error", message:"Hubo un error al cambiar el rol"}) 
        }
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
        res.send({status:"success", message:usuariosDTO});
    } catch (error) {
        req.logger.info("Error al obtener los usuarios", error);
    }
}

async function deleteInactiveUsers(req, res) {
    try {
        const currentTime = new Date();
        const last2Days = new Date(currentTime.getTime() - (2*24*60*60*1000));

        const eliminacion = await userModel.deleteMany({ last_connection: { $lt: last2Days } });

        res.send({status:"success", message:`usuarios eliminados ${eliminacion.deletedCount}`});
    } catch (error) {
        req.logger.info("Error al eliminar usuarios inactivos", error);
    }
}

async function deleteUser(req, res) {
    try {
        await userModel.deleteOne({ email: req.params.email });

        res.send({status:"success", message:`usuario ${req.params.email} eliminado `});
    } catch (error) {
        req.logger.info("Error al eliminar usuarios inactivos", error);
    }
}


export {UserController, getAllUsers, deleteInactiveUsers, deleteUser}