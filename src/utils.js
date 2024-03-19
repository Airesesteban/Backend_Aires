import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { Faker, en } from "@faker-js/faker";

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

export const emailSender = async (emailUsu, tipo) => {
    try {
        let emailTemplate = '';
        if(tipo == "registro"){
            emailTemplate = `<div>
            <h1>Bienvenido!!</h1>
            <img src="https://images.ctfassets.net/y6oq7udscnj8/4wxHPaivVX8IJWzBinto6H/24a37d10d666a66f5e5a5bd9e7cd46f4/Email_Marketing_4_-_Version_4.png?w=2048&h=960&q=50&fm=webp" style="width:250px"/>
            <p>Ya puedes empezar a usar nuestros servicios</p>
            </div>`;   
        }

        const contenido = await transporter.sendMail({
            //Estructura del correo
            from: "Ecommerce CoderCommers",
            to:emailUsu,
            subject:"Registro exitoso",
            html: emailTemplate
        })
        console.log("Contenido", contenido);
        return "ok";
        

    } catch (error) {
        console.log(error.message);
        return "fail";
    }
}

export const generateEmailToken = (email,expireTime)=>{
    const token = jwt.sign({email},options.gmail.emailToken,{expiresIn:expireTime}); 
    return token;
};

export const verifyEmailToken = (token)=>{
    try {
        const info = jwt.verify(token,options.gmail.emailToken);
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