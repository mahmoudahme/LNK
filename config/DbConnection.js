import mongoose from "mongoose";

export const DBConnection = ()=>{
    mongoose.connect("mongodb://localhost:27017/LNK").then((connect)=>{
        console.log(`DataBase Connected ${connect.connection.host}`)
    })
}
     
