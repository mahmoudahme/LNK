import mongoose from "mongoose";

export const DBConnection = ()=>{
    mongoose.connect("mongodb://MahmoudAhmed:mahm1234@cluster0-shard-00-00.qgzok.mongodb.net:27017,cluster0-shard-00-01.qgzok.mongodb.net:27017,cluster0-shard-00-02.qgzok.mongodb.net:27017/Tawaad?ssl=true&replicaSet=atlas-c9i7c6-shard-0&authSource=admin&retryWrites=true&w=majority").then((connect)=>{
        console.log(`DataBase Connected ${connect.connection.host}`)
    })
}
     
