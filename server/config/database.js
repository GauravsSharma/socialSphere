const mongoose = require("mongoose");
exports.connectDatabase= ()=>{
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI).then((con)=>console.log(`Databse Connected: ${con.connection.host}`))
    .catch((err)=>{
        console.log("error aya",err);
    })
}