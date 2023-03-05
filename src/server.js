const e = require("express");
const express = require("express");
const app = express();
// const middleWare= require("../middleware/middleware")
const notFoundHandler = require("../handler/404");
const errorHandler = require("../handler/500");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/data", (req, res) => {
  res.json({
    id: 1,
    name: "mohammad",
    email: "mohammad@gmail,com",
  });
});
//we can add  middleWare between the req and the route  , the middle ware is a function
// we can add more then one middleWare
app.get("/test", middleWare, middleWare2, (req, res) => {
  console.log("back to req");
  res.json({
    id: 2,
    name: "test",
    email: "test@gmail,com",
    time: req.timeStamp,
  });
  console.log("after the res");
});

// the next mean to go the next function which is the req/res in the test
function middleWare(req, res, next) {
  req.timeStamp = new Date();
  next();
  console.log("middleware 1");
}
function middleWare2(req, res, next) {
  req.timeStamp = new Date();
  console.log("middleware 2");
  next();
}

// the req in the middleware is the same req in route and you can manipulate it (change it )
app.get("/books/:bookId", middleWare3, (req, res) => {
  res.json({
    name: "book",
    bookId: req.params.bookId,
  });
});

function middleWare3(req, res, next) {
  req.params.bookId = 5;
  console.log(req.params);
  next();
}
// test for error 500
app.get("/bad", (req, res) => {
  let num = 10;
  let data = num.forEach((element) => {
    console.log(element);
  });
  res.send(data);
});

app.use("*", notFoundHandler);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
