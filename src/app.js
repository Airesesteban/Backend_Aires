import express from 'express';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import {engine} from "express-handlebars";
import viewRouter from "./routes/views.routes.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import ProductManager from './managers/ProductManager.js';


const PORT = 8080;
const app = express();

const httpServer = app.listen(PORT, () => console.log(`Servidor funcionando en el puerto: ${PORT}`));

const socketServer = new Server(httpServer);

const productManager = new ProductManager('src/files/Productos.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

socketServer.on("connection",async(socket)=>{
    console.log("client connected con ID:",socket.id)
    const listadeproductos=await productManager.getProducts()

    socketServer.emit("enviodeproducts",listadeproductos)

    socket.on("addProduct",async(obj)=>{
        await productManager.addProduct(obj)
        const listadeproductos=await productManager.getProducts()
        socketServer.emit("enviodeproducts",listadeproductos)
        })
})