// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { checkCredentials } = require("../controllers/loginController");
const { navbarMainMap, navbarLoginMap } = require("../config/defaults");

// Set router
const loginRouter = express.Router();

// Set route handlers
loginRouter
  .route("/")
  .get((req, res) => {
    DEBUG && console.log("loginRouter. GET: /login");

    res.render("login", { title: "Login", navbar: navbarLoginMap });
  })
  .post(checkCredentials, (req, res) => {
    DEBUG && console.log("loginRouter. POST: /login");

    const { statusCode } = res;
    const { status } = res.locals;

    if (statusCode == 200) {
      res.redirect(303, "/search");
    } else if (statusCode == 400) {
      res.render("login", {
        title: "Login",
        navbar: navbarLoginMap,
        status,
      });
    } else if (statusCode == 503) {
      DEBUG && console.log("loginRouter. 503");

      res.render("503", {
        title: "503",
        navbar: navbarMainMap,
      });
    }
  });

// Export the router to use in other modules
module.exports = loginRouter;
