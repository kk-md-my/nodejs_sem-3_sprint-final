// Import external packages
const express = require("express");

// Set router
const searchRouter = express.Router();

// Set route handlers
searchRouter.get("/", (req, res) => {
  DEBUG && console.log("searchRouter. GET: /search");

  const { isAuth, authStatus } = req.app.locals;

  const dataObj = {
    title: "Search",
    authStatus,
  };

  if (isAuth) {
    res.render("search", dataObj);
  } else {
    DEBUG && console.log("searchRouter. 401");

    res.redirect(401, "/login");
  }
});

// Export the router to use in other modules
module.exports = searchRouter;
