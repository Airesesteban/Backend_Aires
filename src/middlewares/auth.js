import  jwt from "jsonwebtoken";

export const checkRole = (roles)=>{
    return async (req,res,next) => {
        if(!req.session.user.roles){
            return res.json({status:"error",message:"necesitas estar autenticado"});
        }
        if(!roles.includes(req.session.user.roles)){
            res.status(401);
            return res.json({status:"error", message:"no estas autorizado"});
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