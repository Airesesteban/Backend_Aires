import { EError} from "../enums/EError.js";

export  const errorHandler = (error, req ,res, next) => {
    switch (error.code) {
        case EError.ROUTING_ERROR:
            res.json({status:"error",error:error.cause, message:error.message})
            break;
        case EError.AUTH_ERROR:
            break;
        case EError.DATABASE_ERROR:
            res.json({status:"error", message:error.message})
            break;
        case EError.INVALIDAD_PARAM:
            res.json({status:"error",error:error.cause})
            break;
        case EError.UNAUTHORIZED_ERROR:
            res.json({status:"error",error:error.cause, message:error.message})
            break;
        case EError.PRODUCT_CREATION_ERROR:
            res.json({status:"error",error:error.cause, message:error.message})
            break;       
        case EError.CART_CREATION_ERROR:
            res.json({status:"error",error:error.cause, message:error.message})
            break;                               
    
        default:
            res.json({status:"error", message:"Hubo un error, conacte al equipo de sistemas."})
            break;
    }
}