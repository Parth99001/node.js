const express = require("express");
const port = 8080;
const app = express();
const path = require("path");
let records = [];

app.set("view engine", "ejs");
 app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("form",{records});
});
app.post("/addData", (req, res) => {
 // console.log(req.body);
 const {userName} = req.body;
 records.push(userName)

 return res.redirect("/");
});
app.get("/delete/:id",(req,res)=>{
    console.log(req.params.id)
    let id = req.params.id;
  
    records = records.filter((element,i)=>i!=id)
  
   return res.redirect("/")
  })
  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    let data = records[id];
    console.log(data);
    res.render("edit", { data, id });
  });
  app.post("/updateData", (req, res) => {
    console.log(req.body);
    records[req.body.id] = req.body.userName;
    return res.redirect("/");
  });
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`server is running in ${port}`);
  
});