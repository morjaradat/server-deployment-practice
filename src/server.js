const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/data", (req, res) => {
  res.json({
    id: 1,
    name: "mohammad",
    email: "mohammad@mail",
  });
});

function start(port) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
