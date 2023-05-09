import mongoose from "mongoose";
import userModel from "./models/users.js";
import data from "./Users.js";

const MONGO = 'mongodb+srv://damilanofranco:Fran2023$@cluster0.iyqxzj8.mongodb.net/?retryWrites=true&w=majority'


const enviroment = async () =>{

    await mongoose.connect(MONGO);
   // const result = await userModel.insertMany(data);
   // console.log(result);

   const response = await userModel.find({first_name:"Celia"}).explain('executionStats');
console.log(response);

}
console.log(1);
enviroment()
console.log(2);