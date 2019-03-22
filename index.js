const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// create routes
const routes = require("./api/routes/routes");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

routes(server);

module.exports = {
  server
};
