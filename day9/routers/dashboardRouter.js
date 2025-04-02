// jqnp lzrm hkfr uxqq

const express = require("express");
const UserModel = require("../models/UserModel");
const dashboardRouter = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const passport = require("../middleware/passportlocal");
const nodemailer = require("nodemailer");
const ProductModel = require("../models/ProductModels");
const SubProductModel = require("../models/SubProduct");
// const extraSubProductsModel= require('../models/extraSubCategory');
const ExtraSubProductsModel = require("../models/extraSubCategory");


dashboardRouter.get("/dashboard", passport.auth, (req, res) => {
  res.render("dashboard");
});
dashboardRouter.get("/logout", (req, res) => {
  req.session.destroy();
  req.flash("logout", "Logout Successfully");
  res.redirect("/");
});

dashboardRouter.get("/deleteData/:id", async (req, res) => {
  const id = req.params.id;
  const userData = await UserModel.findById(id);
  console.log(userData);
  // return
  try {
    if (userData) {
      fs.unlinkSync(path.join(__dirname + "/.." + userData.image));
    }
    await UserModel.findByIdAndDelete(id);
    console.log("user deleted successfully");
    res.redirect("/userTable");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});
dashboardRouter.get("/", (req, res) => {
  // let getData = req.cookies.userData
  // if(!getData){
  // }else{
  //   res.render("dashboard")
  // }
  res.render("login");
});

dashboardRouter.get("/signup", (req, res) => {
  // let getData = req.cookies.userData
  // if(!getData){
  // }else{
  //   res.render("dashboard")
  // }
  res.render("signup");
});

dashboardRouter.get("/editData/:id", async (req, res) => {
  try {
    let userData = await UserModel.findById(req.params.id);
    res.render("editForm", { userData });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
});

dashboardRouter.post(
  "/updateData/:id",
  UserModel.multerImage,
  async (req, res) => {
    try {
      let userData = await UserModel.findById(req.params.id);
      console.log(req.file);
      if (req.file) {
        fs.unlinkSync(path.join(__dirname + "/.." + userData.image));
        req.body.image = UserModel.imageUpload + "/" + req.file.filename;
      }

      await UserModel.findByIdAndUpdate(req.params.id, req.body);
      console.log("user updated");
      res.redirect("/userTable");
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  }
);
dashboardRouter.post("/createData", UserModel.multerImage, async (req, res) => {

  try {
    console.log(req.file);
    if (req.file) {
      req.body.image = UserModel.imageUpload + "/" + req.file.filename;
    }
    await UserModel.create(req.body);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

dashboardRouter.get("/userTable", passport.auth, async (req, res) => {
  try {
    const getUsers = await UserModel.find({});

    res.render("userTable", { getUsers });
  } catch (error) {
    console.log(error);
  }
});

dashboardRouter.get("/addProducts", passport.auth, async (req, res) => {
  res.render("addProducts");
});

dashboardRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  async (req, res) => {
    console.log(req.body);
    req.flash("success", "login Successfully");
    console.log(req.flash);
    res.redirect("/dashboard");
  }
);
dashboardRouter.post("/otpcheck", async (req, res) => {
 
  let getData = await UserModel.findOne({ email: req.body.otpEmail });
  if (getData) {
    let otp = Math.floor(Math.random() * 10000);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parthgandhi350@gmail.com",
        pass: "jqnp lzrm hkfr uxqq",
      },
    });

    var mailOptions = {
      from: "parthgandhi350@gmail.com",
      to: req.body.otpEmail,
      subject: "OTP",
      text: `OTP ${otp} dont share otp to anyone `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });
    res.cookie("otp", otp, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie("email", req.body.otpEmail);

    console.log(req.cookies.otp);

    res.redirect("/otpPage");
  } else {
    console.log("User Not Found");
    res.redirect("/");
  }
});
dashboardRouter.get("/changePass", passport.auth, (req, res) => {
  res.render("changePass");
});

dashboardRouter.post("/updatepass", passport.auth, async (req, res) => {
  try {
    const { old_password, new_password, Confirm_new_password } = req.body;

    // console.log(old_password, new_password, Confirm_new_password);

    const user = await UserModel.findById(req.user._id);

    if (old_password !== req.user.password) {
      console.log("not same");
      return;
    }

    if (new_password !== Confirm_new_password) {
      console.log("New Pass Not Same");
      return;
    }

    user.password = new_password;
    await user.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

dashboardRouter.get("/otpPage", async (req, res) => {
  console.log(req.cookies.otp);
  res.render("otpPage");
  return;
});

dashboardRouter.post("/otpVeri", async (req, res) => {
  try {
    const otp = req.cookies.otp;

    const { otpver } = req.body;

    // console.log(otp , otpver);
    // return

    if (otp !== otpver) {
      console.log("NOt same");
      return;
    }

    res.redirect("/changepasswordpage");
    console.log("Verified");
  } catch (error) {
    console.log(error);
  }
});

dashboardRouter.get("/changepasswordpage", (req, res) => {
  res.render("changepasswordpage");
});

dashboardRouter.post("/otppass", async (req, res) => {
  try {
    const { newpassword, confirmnewpassword } = req.body;
    console.log(newpassword, confirmnewpassword);
    const email = req.cookies.email;
    const user = await UserModel.findOne({ email });

    if (newpassword !== confirmnewpassword) {
      console.log("New Pass Not Same");
      return;
    }

    user.password = newpassword;
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
dashboardRouter.post("/addProduct", async (req, res) => {
  try {
    await ProductModel.create(req.body);
    console.log(req.body);
    req.flash("success", "Product added successfully");
    console.log("product created successfully");
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

dashboardRouter.post("/addSubProduct", async (req, res) => {});

dashboardRouter.get("/addSubProducts", async (req, res) => {
  try {
    const getProducts = await ProductModel.find({});
    res.render("addSubProducts", { getProducts});
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});




dashboardRouter.get("/subProductTable", passport.auth, async (req, res) => {
  try {
    const getSubProducts = await SubProductModel.find().populate("productId").exec();
    console.log(getSubProducts);
    res.render("subProductTable", { getSubProducts });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
})

dashboardRouter.post("/createSubProduct", async (req, res) => {
  try{
    await SubProductModel.create(req.body)
   
    console.log("sub product created")
    res.redirect("/dashboard");
  }catch (err) {
    console.log(err);
    res.redirect("back");
  }
})

dashboardRouter.get("/addExtraSubProduct",async (req,res)=>{
  try {
    const getData = await ExtraSubProductsModel.find().populate("productId").populate("subProductId").exec();
    console.log(getData)
     res.render("addExtraSubProduct",{getData})
  } catch (error) {
    console.log(error);
    res.redirect("back")
  }
})
 dashboardRouter.post("/addSubData", async (req, res) => {
   try {
     await ExtraSubProductsModel.create(req.body);
     console.log("Extra sub product added");
     res.redirect("/dashboard"); 
   } catch (error) {
     console.log(error);
     res.redirect("back");
   }
 });
module.exports = dashboardRouter;