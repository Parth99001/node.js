const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("Connected Data Base");
};
module.exports = connection;
