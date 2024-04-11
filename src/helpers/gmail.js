import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const emailsSender = config.sender.emailsSender;
const passSender = config.sender.passSender;

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

export const emailSender = async (emailUsu, tipo,objectId) => {
    try {
        let subject = "";
        let emailTemplate = '';
        switch(tipo){
            case "registro":
            subject = "Bienvenido al futuro del ecommerce"
            emailTemplate = `<div>
            <h1>Bienvenido!!</h1>
            <img src="https://images.ctfassets.net/y6oq7udscnj8/4wxHPaivVX8IJWzBinto6H/24a37d10d666a66f5e5a5bd9e7cd46f4/Email_Marketing_4_-_Version_4.png?w=2048&h=960&q=50&fm=webp" style="width:250px"/>
            <p>Ya puedes empezar a usar nuestros servicios</p>
            </div>`;
            break;
            
            case "UsuarioEliminado":
            subject = "Vuelve pronto!"
            emailTemplate = `<div>
            <h1>Lo sentimos mucho</h1>
            <p>Su usuario fue eliminado debido a su inactividad</p>
            <p>Para volver a usar nuestros servicios, por favor registrese nuevamente</p>
            <a href="http://localhost:8080/register">Registrarse</a>
            </div>`;
            break;
            
            case "productoEliminado":
            subject = "Tu producto fue eliminado" 
            emailTemplate = `<div>
            <h1>Su producto se ha eliminado</h1>
            <p>El producto ${objectId} fue eliminado</p>
            </div>`;
            break;
            
            case "cambioDeRol":
            subject = "Sus permisos se han actualizado" 
            emailTemplate = `<div>
            <h1>Su rol ha cambiado a ${objectId}</h1>
            </div>`;
            break; 

            case "ticket":
            subject = "Gracias por su compra!" 
            emailTemplate = `<div>
            <h1>Su ticket de compra</h1>
            <p>Ticket numero: ${objectId.code}</p>
            <p>Fecha: ${objectId.purchase_datetime}</p>
            <p>Precio total: ${objectId.amount}</p>
            <p>Usuario: ${objectId.purchaser}</p>
            <p>Productos</p>
            <ul>`
            console.log(objectId)
            objectId.products.forEach(p => {
                emailTemplate += `<li>${p.product.title} ${p.quantity} ${p.product.price * p.quantity}</li>` 
            });
            emailTemplate += `</ul> </div>`
            break; 
        }

        const contenido = await transporter.sendMail({
            //Estructura del correo
            from: emailsSender,
            to:emailUsu,
            subject,
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
    const link = `http://localhost:8080/resetPassword?token=${token}`;
    await transporter.sendMail({
        from:emailsSender,
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