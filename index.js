const express = require("express");

const apiRoutes = require("./routes/apiRoutes");

const server = express();

server.use(express.json());
server.use("/api", apiRoutes);

server.listen(4000, () => console.log("Server is running..."));
