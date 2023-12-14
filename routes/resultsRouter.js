// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { getData } = require("../controllers/resultsController");

// Set router
const resultsRouter = express.Router();

// Set route handlers
resultsRouter.get("/", getData, (req, res) => {
  const { data } = res;

  res.render("results", { data });
});

// Export the router to use in other modules
module.exports = resultsRouter;
