const express = require("express")
const port = 8081
const app = express()
const path= require("path")

app.set("view engine","ejs");
app.use("/assets", express.static(path.join(__dirname,"./assets")));
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/service",(req,res)=>{
    res.render("service")
})
app.listen(port,(error)=>{
    if(error){
       console.log(error);
       
        return
    }
    console.log(`Server is running on port ${port}`);
})