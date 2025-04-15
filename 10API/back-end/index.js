const express = require('express');
const connected = require('./config/db');
const UserRouter = require('./routes/userRouter');
const auth = require('./middleware/auth')
const cors =require('cors'); 

const app =express()
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/users",UserRouter)
app.use('/Product', UserRouter);
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log("Server is not connected", error);
    } else {
        connected();
        console.log(`Port is Running ${process.env.PORT}`);
    }
});