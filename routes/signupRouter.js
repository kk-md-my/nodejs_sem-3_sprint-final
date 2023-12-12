// Import external packages
const express = require("express");

// Set router
const signupRouter = express.Router();

// Set route handlers
signupRouter.get("/", (req, res) => {
  res.send("Hey I am Sign up Page");
});

// Export the router to use in other modules
module.exports = signupRouter;
