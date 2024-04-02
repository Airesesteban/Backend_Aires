import {expect} from "chai";
import supertest from "supertest";
import cartsModel from "../dao/models/carts.model.js";
import {config} from "../config/config.js";
import mongoose from "mongoose";

import app from "../app.js";

const requester = supertest(app);
const userID = "66074e3c07b5b404efd510db"
let createdProduct = null;

describe("Testing de app ecommerce", () => {
    describe("Test del modulo carts",()=>{
        
        before( async function(){
            await mongoose.connect(config.mongo.url);
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
            createdProduct = body.message
        })
    
       /*  beforeEach( async function(){
            await cartsModel.deleteMany();
            this.timeout(5000);
        }) */
    
        after(async function(){
            await mongoose.connection.close();
        })
    
        it("DELETE /api/carts/:cid most return 200", async function(){
            //crear carro
            const {body, status} = await requester.post("/api/carts").send();
            expect(status).to.be.equal(200);
            //get carro
            const response = await requester.get(`/api/carts/${body.message._id}`)
            expect(response.body.message.products).to.be.an('array').that.is.empty;
            //agregar un producto
            const addedProduct = await requester.post(`/api/carts/${body.message._id}/product/${createdProduct._id}`).send({quantity:1,userId:userID});
            expect(addedProduct.body.message.products).to.not.be.empty;
            //cambiar quantity a un producto
            const updatedQuantity = await requester.put(`/api/carts/${body.message._id}/product/${createdProduct._id}/`).send({quantity:1,userId:userID});
            expect(updatedQuantity.body.message.products[0].quantity).to.equal(2);
            //purchase cart
            const purchasedCartTicket = await requester.post(`/api/carts//${body.message._id}/purchase/`);
            expect(purchasedCartTicket.body.message.products).to.have.lengthOf(1);
            expect(purchasedCartTicket.body.message.products[0].quantity).to.equal(2);
            //chequear que el carro esta pago
            const check = await requester.get(`/api/carts/${body.message._id}`)
            expect(check.body.message.paid).to.be.true;
            //delete cart
            const responseDelete = await requester.delete(`/api/carts/${body.message._id}`)
            expect(responseDelete.body.message).to.be.equal("EL carrito ya esta pago");
        })
    })
})

