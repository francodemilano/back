import  express  from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";


const app = express();
const PORT = 8080;


app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))

app.use('/api/carts', cartsRouter)
app.use('/api/products',productsRouter)