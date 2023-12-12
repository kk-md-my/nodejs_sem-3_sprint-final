// Import external packages
const express = require("express");

// Set router
const searchRouter = express.Router();

// Set route handlers
searchRouter.get("/", (req, res) => {
  res.send("Hey I am Search Page");
});

// Export the router to use in other modules
module.exports = searchRouter;
