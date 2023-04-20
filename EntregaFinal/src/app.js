import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import fs from 'fs'

const app = express();
const PORT = 8080;

const appServer = app.listen(PORT, () => {
    console.log(`Server started on ${PORT} ports.`)
})

export const socketServer = new Server(appServer)

socketServer.on('connection', (socket) => {
    console.log('Usuario encontrado', socket.id)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)