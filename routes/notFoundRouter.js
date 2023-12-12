// Import external packages
const express = require("express");

// Set router
const notFoundRouter = express.Router();

// Set route handlers
notFoundRouter.get("*", (req, res) => {
  res.send("404: Not Found");
});

// Export the router to use in other modules
module.exports = notFoundRouter;
