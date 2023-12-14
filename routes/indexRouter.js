// Import external packages
const express = require("express");

// Set router
const indexRouter = express.Router();

// Set route handlers
indexRouter.get("^/$|^/home$", (req, res) => {
  res.send("Hello I am a home page");
});

// Export the router to use in other modules
module.exports = indexRouter;
