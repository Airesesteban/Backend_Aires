import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { cartsRouter } from './routes/carts.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { engine } from "express-handlebars";
import viewRouter from "./routes/views.routes.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import {ProductManager} from './dao/managers/ProductManager.js';
import mongoose from "mongoose";
import messageModel from "./dao/models/message.model.js";
import handlebars from "express-handlebars";
import passport from 'passport';
import {errorHandler} from "./middlewares/errorHandler.js"

import mockRouter from './routes/mockRouter.js';
import {FsProductRouter} from "./routes/FsProducts.routes.js";
import { FsCartRouter } from './routes/FsCarts.routes.js';
import {dbMessageRouter} from "./routes/dbMessages.routes.js";
import sessionRouter from "./routes/session.routes.js";
import inicializePassport from './config/passport.config.js';

import { config } from "./config/config.js";

const PORT = config.server.port;
const app = express();

const httpServer = app.listen(PORT, () => console.log(`Servidor funcionando en el puerto: ${PORT}`));


mongoose.set('strictQuery', true);

const connection = mongoose.connect(config.mongo.url);


app.use(session({
  store: new MongoStore({
    mongoUrl: config.mongo.url,
    ttl: 3600
  }),
  secret: "CoderSecret",
  resave:false,
  saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

inicializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

app.use("/api/FsProducts", FsProductRouter);
app.use("/api/FsCarts", FsCartRouter);
app.use("/api/dbMessages", dbMessageRouter);
app.use("/api/sessions", sessionRouter);
app.use('/api', mockRouter);




const io = new Server(httpServer);
const productManager = new ProductManager(io);


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

export default app;