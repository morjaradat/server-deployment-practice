require("dotenv").config();

const server = require("./src/server");

const port = process.env.port || 3000;

server.start(port);
