import {expect} from "chai";
import supertest from "supertest";
import cartsModel from "../dao/models/carts.model.js";
import {config} from "../config/config.js";
import mongoose from "mongoose";

import app from "../app.js";

const requester = supertest(app);

describe("Testing de app ecommerce", () => {
    describe("Test del modulo carts",()=>{
        
        before( async function(){
            await mongoose.connect(config.mongo.url);
        })
    
       /*  beforeEach( async function(){
            await cartsModel.deleteMany();
            this.timeout(5000);
        }) */
    
        after(async function(){
            await mongoose.connection.close();
        })
    
        it("DELETE /api/carts/:cid most return 200", async function(){
            const cartMock = {
                products: [
                    {
                        product: "65a3e51fb17593fb981603bd",
                        quantity: 1
                    }
                ]
            }
            const {body, statusCode, ok} = (await requester.post("api/carts")).setEncoding(cartMock);
    
            const responseDelete = await requester.delete(`/api/carts/${body.payload._id}`)
    
            const response = await requester.get(`/api/carts/${body.payload._id}`)
    
            expect(response.body.payload).to.be.equal(undefined);
        })
    })
})

