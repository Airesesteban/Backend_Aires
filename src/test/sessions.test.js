import {expect} from "chai";
import supertest from "supertest";
import userModel from "../dao/models/users.model.js";
import { createHash, validatePassword } from "../utils.js";
import {config} from "../config/config.js";
import mongoose from "mongoose";

import app from "../app.js";

const requester = supertest(app);

describe("Testing de app ecommerce", () => {
    describe("Test del modulo sessions",()=>{
        
        before( async function(){
            await mongoose.connect(config.mongo.url);
        })
    
      /*   beforeEach( async function(){
            await userModel.deleteMany();
            this.timeout(5000);
        }) */
    
        after(async function(){
            await mongoose.connection.close();
        })

        it("El servicio debe realizar un hasheo efectivo de la contraseña", async function(){

            const passwordLogin = "1234";
            const efectiveHash = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
            const passwordHash = await createHash(passwordLogin);
            expect(efectiveHash.test(passwordHash)).to.be.equal(true);
        })

        it("El hasheo realizado debe poder compararse de manera efectiva con la contraseña original (la comparación debe resultar en true)", async function(){

            const passwordLogin = "1234";
            const passwordHash = await createHash(passwordLogin);
            const mockUser = {
                email: "pepe@gmail.com",
                password: passwordHash
            }
            const result = await validatePassword(passwordLogin,mockUser)
            expect(result).to.be.equal(true);
        })  
    }) 
})     