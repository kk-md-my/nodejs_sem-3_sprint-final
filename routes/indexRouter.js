// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { navbarMainMap } = require("../config/defaults");

// Set router
const indexRouter = express.Router();

// Set route handlers
indexRouter.get("^/$|^/home$", (req, res) => {
  DEBUG && console.log("indexRouter. GET: /home");

  const dataObj = {
    title: "Home",
    navbar: navbarMainMap,
  };

  res.render("index", dataObj);
});

// Export the router to use in other modules
module.exports = indexRouter;
