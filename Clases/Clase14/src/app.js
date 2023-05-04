import express  from "express";
import estudiantesRouter from './routes/estudiante.route.js';
import mongoose from "mongoose";

const PORT = 8080;
const MONGO = 'mongodb+srv://damilanofranco:Fran2023$@cluster0.iyqxzj8.mongodb.net/?retryWrites=true&w=majority'

const app = express();
const conection = mongoose.connect(MONGO);

app.use(express.json());
app.use('/estudiantes',estudiantesRouter);


const server = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})
