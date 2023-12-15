// Import external packages
const express = require("express");

// Set router
const searchRouter = express.Router();

// Set route handlers
searchRouter.get("/", (req, res) => {
  const dataObj = {
    title: "Search",
  };

  res.render("search", dataObj);
});

// Export the router to use in other modules
module.exports = searchRouter;
