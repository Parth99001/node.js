const mongoose = require('mongoose')

 const connected = async function () {
    await mongoose.connect(process.env.MONGO_DB)
    console.log("Connected to Atlas");
    
}
module.exports =connected;