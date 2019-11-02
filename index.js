// tell the server where to get express & apiRoutes
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");

// tells the server to become one with express
// ommmmmmmmmmmmmmm
const server = express();

// has the server use express json
// this is necessary for anything to work
server.use(express.json());

// when a request comes in beginning with "/api"
// send that request over to apiRoutes
server.use("/api", apiRoutes);

// begin listening
server.listen(4000, () => console.log("Server is running..."));
