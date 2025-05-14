const mongoose=require("mongoose");
require("dotenv").config();


exports.connect=()=>{

    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB Connection Successfull")})
    .catch((error)=>{
        console.error(error);
        console.log("Error in DB Connection");
        process.exit(1);
    })
}





