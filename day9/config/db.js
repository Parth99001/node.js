const mongoose = require("mongoose")


const connection = async()=>{
    await mongoose.connect("mongodb://127.0.0.1/parthadmin")
    console.log("conencted Mongo");
    
}
module.exports=connection;