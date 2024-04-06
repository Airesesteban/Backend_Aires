import userModel from "../dao/models/users.model.js";
import { GetUserDto } from "../dao/dto/user.dto.js";

class UserController{
    static changeRol= async(req,res)=>{
        try {  
            const userId =req.params.id;
            const user = await userModel.findById(userId);
            const userRol= user.rol;
            if(userRol === "usuario"){
                user.rol = "premium"
            } else if(userRol === "premium"){
                user.rol = "user"
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

        return usuariosDTO;
    } catch (error) {
        req.logger.info("Error al obtener los usuarios", error);
    }
}

async function deleteInactiveUsers(req, res) {
    try {
        const last2Days = new Date();
        last2Days.setDate(last2Days.getDate() -2);

        const eliminacion = await userModel.deleteMany({ last_connection: { $lt: dosDiasAtras } });

        console.log(`${eliminacion.deletedCount} usuarios eliminados.`);
        return eliminacion.deletedCount;
    } catch (error) {
        req.logger.info("Error al eliminar usuarios inactivos", error);
    }
}

export {UserController, getAllUsers, deleteInactiveUsers}