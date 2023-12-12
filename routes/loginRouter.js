// Import external packages
const express = require("express");

// Set router
const loginRouter = express.Router();

// Set route handlers
loginRouter.get("/", (req, res) => {
  res.send("Hey I am Login Page");
});

// Export the router to use in other modules
module.exports = loginRouter;
