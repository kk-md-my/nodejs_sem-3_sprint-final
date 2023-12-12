// Import external packages
const express = require("express");

// Set router
const resultsRouter = express.Router();

// Set route handlers
resultsRouter.get("/", (req, res) => {
  res.send("Hey I am Results Page");
});

// Export the router to use in other modules
module.exports = resultsRouter;
