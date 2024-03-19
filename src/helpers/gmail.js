import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const adminEmail = config.gmail.adminAccount;
const adminPass = config.gmail.adminPass;

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

export { transporter };

// funcion envio de recuperacion de contraseña

export const sendRecoveryPass = async (userEmail, token) => {
    const link = `http://localhost:8080/reset-password?token=${token}`;
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