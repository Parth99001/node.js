// const add = require('./Add')
// console.log(add(1,3));
// const mul = require('./Mul')
// console.log(mul(2,3));
const { error } = require("console");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    switch (req.url) {
      case "/":
        filename = "index.html";
        break;
      case "/about":
        filename = "about.html";
        break;
      default:
        filename = "service.html";
        break;
    }
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.write(data);
        res.end();
      }
    });
    // fs.readFile("node.txt", "utf8", (err, data) => {
    //   if(err){
    //     console.log(err);
    //     return
    //   }else{
    //   res.write("<h1>Hello From Server</h1>");
    //   res.write(`<h2>${data}</h2>`);
    //   res.end();
    // }});
  })
  .listen(8080, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`server is Running `);
  });
