import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { Faker, en } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";

export const customFaker = new Faker({locale: [en] });

const {commerce, image, string, datatype, database } = customFaker;

export const generateProduct = () => {
    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        code: string.alphanumeric(10),
        price: parseFloat(commerce.price()),
        status: datatype.boolean(0.9),
        stock: parseInt(string.numeric(10)),
        category: commerce.department(),
        thumbnails: image.url()
    };
};



export const generateEmailToken = (email,expireTime)=>{
    const token = jwt.sign({email},config.gmail.emailToken,{expiresIn:expireTime}); 
    return token;
};

export const verifyEmailToken = (token)=>{
    try {
        const info = jwt.verify(token,config.gmail.emailToken);
        console.log(info);
        return info.email;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;