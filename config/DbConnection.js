import mongoose from "mongoose";

export const DBConnection = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/LNK").then((connect)=>{
        console.log(`DataBase Connected ${connect.connection.host}`)
    })
}
     
