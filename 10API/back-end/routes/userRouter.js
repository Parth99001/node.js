const express = require("express");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ProductModel = require("../models/productModel");
const auth = require("../middleware/auth");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    password = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

UserRouter.post('/addproduct', auth, async (req, res) => {
  const { name, desc, price } = req.body;
  try {
    const newProduct = new ProductModel({ name, desc, price });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
UserRouter.get("/data", auth, async (req, res) => {
  try {
    const users = await UserModel.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {

      let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      return res
        .status(200)
        .json({ success: true, message: "Login Successful", token });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

UserRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

UserRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  let { name, email, password } = req.body;

  try {
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    await UserModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = UserRouter;
