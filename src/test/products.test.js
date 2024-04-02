import {expect} from "chai";
import supertest from "supertest";
import productsModel from "../dao/models/products.model.js"
import {config} from "../config/config.js";
import mongoose from "mongoose";

import app from "../app.js";

const requester = supertest(app);

describe("Testing de app ecommerce", () => {
    describe("Test del modulo products", () => {
        
        before( async function(){
            await mongoose.connect(config.mongo.url);
        })

        /* beforeEach( async function(){
            await productsModel.deleteMany();
            this.timeout(5000);
        }) */
    
        after(async function(){
            await mongoose.connection.close();
        })
        
        it("DELETE /api/products/:pid most return 200", async function(){
            const prodMock = {
                title: "Celular g8",
                description: "Celular gama media 16",
                code: "5",
                price: 3600,
                stock: 20,
                category: "electronica",
                owner: "66074e3c07b5b404efd510db"
            }
            const {body} = await requester.post("/api/products").send(prodMock);
            expect(body.status).to.be.equal("success");
            let response = await requester.get(`/api/products/${body.message._id}`)

            const responseDelete =  await requester.delete(`/api/products/${body.message._id}`).send({owner: "66074e3c07b5b404efd510db"})

            response = await requester.get(`/api/products/${body.message._id}`)

            expect(response.body.message).to.be.equal("Producto no encontrado");
        })
    })
})



