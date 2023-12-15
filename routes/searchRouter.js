// Import external packages
const express = require("express");

// Set router
const searchRouter = express.Router();

// Set route handlers
searchRouter.get("/", (req, res) => {
  const { isAuth, authStatus } = req.app.locals;

  const dataObj = {
    title: "Search",
    authStatus,
  };

  if (isAuth) {
    res.render("search", dataObj);
  } else {
    res.status(401).render("401", { title: 401 });
  }
});

// Export the router to use in other modules
module.exports = searchRouter;
