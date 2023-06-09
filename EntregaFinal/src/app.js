import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import adminRouter from "./router/admin.routes.js";
import sessionRouter from "./router/session.routes.js";
import viewsRouter from "./router/views.routes.js";
import chatRouter from "./router/chat.routes.js"
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";



const DB = 'ecommerce';
const MONGO = 'mongodb+srv://damilanofranco:Fran2023$@cluster0.iyqxzj8.mongodb.net/?retryWrites=true&w=majority' 
const PORT = process.env.PORT || 8080;
const app = express();
const connect = mongoose.connect(MONGO);
const server = app.listen(PORT, ()=>{
  console.log('Servidor funcionando en el puerto: '+ PORT);
})

app.use (session({
  store: new MongoStore({
    mongoUrl: MONGO,
    ttl:3600
  }),
  secret: 'CoderSecret',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter)
app.use('/api/session', sessionRouter); 
app.use('/api/chat', chatRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/', adminRouter);


const io = new Server(server)
const messages = []

io.on('connection', socket => {
    console.log('socket connected')
    socket.emit('messageLogs', messages)
    socket.on('message', async data => {
        messages.push(data)  
        io.emit('messageLogs', messages)

      }); 

    socket.on('authenticated', data => {
      socket.broadcast.emit('newUserConnected', data);
    });
  });