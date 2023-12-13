// Import external packages
const express = require("express");

// Set router
const searchRouter = express.Router();

// Set route handlers
searchRouter.get("/", (req, res) => {
  // res.render("searchBar");
  // res.render("search");
  res.send("hello I am a search page");
});

// Export the router to use in other modules
module.exports = searchRouter;
