// Import external packages
const express = require("express");

// Set router
const indexRouter = express.Router();

// Set route handlers
indexRouter.get("^/$|^/home$", (req, res) => {
  DEBUG && console.log("indexRouter. GET: /home");

  const dataObj = {
    title: "Home",
  };

  res.render("index", dataObj);
});

// Export the router to use in other modules
module.exports = indexRouter;
