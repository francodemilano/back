import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import viewsRouter from "./router/views.routes.js";
import chatRouter from "./router/chat.routes.js"
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
//import messagesModel from "./Dao/models/message.model.js";

const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})

const MONGO = "mongodb+srv://freddymdq:federico@cluster0.wm7ahcr.mongodb.net/ecommerce?retryWrites=true&w=majority"
const connect = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Estaticos
app.use(express.static(__dirname+'/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes
app.use('/', viewsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

const io = new Server(server)
const messages = []

io.on('connection', socket => {
    console.log('socket connected')
  
    socket.emit('messageLogs', messages)
  
    socket.on('message', async data => {
        // Pusheamos un mensaje a un arrays para mostrarlo por handlebars. 
        messages.push(data)  
        io.emit('messageLogs', messages)
        // Crear un nuevo documento en la base de datos
       // await messagesModel.create({ user: data.user, message: data.message })
      });
  
    socket.on('authenticated', data => {
      socket.broadcast.emit('newUserConnected', data);
    });
  });