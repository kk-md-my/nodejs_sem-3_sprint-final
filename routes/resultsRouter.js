// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { getData, saveSearch } = require("../controllers/resultsController");

// Set router
const resultsRouter = express.Router();

// Set route handlers
resultsRouter.get("/", saveSearch, getData, (req, res) => {
  DEBUG && console.log("resultsRouter. GET: /results");

  const { data, statusCode } = res;

  if (statusCode == 200) {
    res.render("results", {
      title: "Results",
      data,
    });
  } else if (statusCode == 401) {
    DEBUG && console.log("resultsRouter. 401");

    res.redirect("/login");
  } else if (statusCode == 503) {
    DEBUG && console.log("resultsRouter. 503");

    res.render("503", {
      title: "503",
    });
  }
});

// Export the router to use in other modules
module.exports = resultsRouter;
