
import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async() =>{
    mongoose.set('strictQuery',true)
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
    if(isConnected) return console.log("Already connected to db");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
}