import userModel from "../dao/models/users.model.js";

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

export {UserController}