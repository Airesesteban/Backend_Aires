import  jwt from "jsonwebtoken";
import  {config}  from "../config/config.js"
import userModel from "../dao/models/users.model.js";

export const checkRole = (roles)=>{
    return async (req,res,next) => {
        if(!req.body.owner){
            return res.json({status:"error",message:"necesitas estar autenticado"});
        }
        const userRoles = (await userModel.findById(req.body.owner)).rol
        if(!roles.includes(userRoles)){
            return res.json({status:"error",message:"no estas autorizado"});
        }
        next();
    }
}

export const verifyEmailTokenMW = () =>{
    return (req,res,next) => {
        try {
            const jwtToken = req.query.token;
            const decoded = jwt.decode(jwtToken);
            const expTime = decoded.exp * 1000;
            const expDate = new Date(expTime);
            const currentDate = new Date();

            if(currentDate > expDate){
                return res.json({status:"error",message:"Token vencido"});
            }

        } catch (error) {
            return res.json({status:"error",message:"error en el token"});
        }
        next();
    }
}