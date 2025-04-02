const express = require('express');
const connection = require('./config/db');
const app = express();


app.get("/",(req,res)=>{
    res.send("databse")
})

app.listen(8082,(err)=>{
    if(err){
        console.log(err);
        return
    }
    connection();   
    console.log("Server is on");
    
})