// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { navbarMainMap } = require("../config/defaults");

// Set router
const notFoundRouter = express.Router();

// Set route handlers
notFoundRouter.get("*", (req, res) => {
  DEBUG && console.log("notFoundRouter. GET: 404");

  res.status(404).render("404", { title: "404", navbar: navbarMainMap });
});

// Export the router to use in other modules
module.exports = notFoundRouter;
