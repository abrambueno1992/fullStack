const express = require("express");
const helmet = require("helment");
const cors = require("cors");
// create routes
const routes = require("./api/routes/routes");
const server = express();

server.user(helment());
server.use(cors());
server.use(express.json());

routes(server);

module.exports = {
  server
};
