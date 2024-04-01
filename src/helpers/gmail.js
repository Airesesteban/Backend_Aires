import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const emailsSender = config.gmail.emailsSender;
const passSender = config.gmail.passSender;

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:emailsSender,
        pass:passSender
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

export { transporter };

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

// funcion envio de recuperacion de contraseña

export const sendRecoveryPass = async (userEmail, token) => {
    const link = `http://localhost:8080/restartPassword?token=${token}`;
    await transporter.sendMail({
        from:config.gmail.adminAccount,
        to:userEmail,
        subject:"reestablecer contraseña",
        html:`
        <div>
            <h2>Has solicitado un cambio de contraseña</h2>
            <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
            </br>
            <a href="${link}">
                <button> Restablecer contraseña </button>
            </a>
        </div>
        `
})
}