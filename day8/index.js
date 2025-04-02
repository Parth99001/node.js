const express = require("express");
const conn = require("./config/db");
const userModel = require("./model/useModel");
const fs = require("fs");
const app = express();
const path = require("path");

app.use(express.json()); // This allows handling JSON requests
app.use(express.urlencoded({ extended: true }));
// Middleware for JSON body parsing
app.set("view engine", "ejs");

app.use("/upload", express.static(path.join(__dirname, "/upload")));

app.get("/", async (req, res) => {
  try {
    let userdata = await userModel.find({});
    console.log(userdata);

    res.render("form", { userdata });
  } catch (err) {
    console.log(err);
    res.render("form");
  }
});

app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  const userdata = await userModel.findById(id);
  console.log(id);

  try {
    if (userdata) {
      fs.unlinkSync(path.join(__dirname + userdata.image));
    }
    await userModel.findByIdAndDelete(id);
    console.log("user Deleted");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
app.get("/edit/:id", async (req, res) => {
  try {
    let userdata = await userModel.findById(req.params.id);

    res.render("editform", { userdata });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/update/:id", userModel.multerimage, async (req, res) => {
  let userData = await userModel.findById(req.params.id);
  try {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname + userData.image));
      req.body.image = userModel.imageUpload + "/" + req.file.filename;
    }
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/add-data", userModel.multerimage, async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  try {
    if (req.file) {
      req.body.image = userModel.imageUpload + "/" + req.file.filename;
    }
    await userModel.create(req.body);
    console.log("user Added");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(8080, (err) => {
  if (err) {
    console.log("Error starting the server:", err);
    return;
  }
  conn();
  console.log("Server is running on port 8080");
});
