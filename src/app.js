import express from 'express';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import {engine} from "express-handlebars";
import viewRouter from "./routes/views.routes.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import ProductManager from './managers/ProductManager.js';
import mongoose from "mongoose";
import messageModel from ".dao/models/message.model.js";

import {dbProductsRouter} from "../routes/dbProductsRoutes.js";
import { dbCartsRouter } from './routes/dbCarts.routes.js';
import {dbMessageRouter} from "../routes/dbMessages.routes.js";


const PORT = 8080;
const app = express();

const httpServer = app.listen(PORT, () => console.log(`Servidor funcionando en el puerto: ${PORT}`));

const socketServer = new Server(httpServer);

const productManager = new ProductManager('src/files/Productos.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const MONGO = "mongodb+srv: airesesteban:Blancaoscar1@backend-aires.xckuzk8.mongodb.net/";
const connection = mongoose.connect(MONGO);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

app.use("/api/dbProducts", dbProductsRouter);
app.use("/api/dbCarts", dbCartsRouter);
app.use("/api/dbMessages", dbMessagesRouter);

io.on('connection', async (socket) => {
    try {
      console.log('Nuevo cliente conectado');
      
      socket.on('sendMessage', async (data) => {
        
        try {
          const newMessage = await messageModel.create({ user: data.user, message: data.message });
          console.log('Nuevo mensaje guardado', newMessage);
  
          io.emit('newMessage', { user: data.user, message: data.message });
        } catch (error) {
          console.error('Error al guardar el mensaje en la base de datos:', error.message);
        }
      });
  
  
    } catch (error) {
      console.error('Error en la conexión de socket:', error.message);
    }
  });