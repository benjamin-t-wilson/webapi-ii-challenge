// tells the server where to get express and postRoutes
const express = require("express");
const postRoutes = require("./postRoutes");

// explains that router is to use the express.Router function
const router = express.Router();

// requests that come in /api/posts will go to postRoutes
router.use("/posts", postRoutes);

// necessary for exporting the router
// this should always be the last line
module.exports = router;
