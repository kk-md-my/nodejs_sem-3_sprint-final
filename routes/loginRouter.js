// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { checkCredentials } = require("../controllers/loginController");

// Set router
const loginRouter = express.Router();

// Set route handlers
loginRouter
  .route("/")
  .get((req, res) => {
    const dataObj = {
      title: "Login",
    };

    res.render("login", dataObj);
  })
  .post(checkCredentials, (req, res) => {
    const { statusCode } = res;

    if (statusCode == 200) {
      res.redirect("/search");
    } else if (statusCode == 401) {
      res.redirect("/");
    } else if (statusCode == 503) {
      res.render("503", {
        title: "503",
      });
    }
  });

// Export the router to use in other modules
module.exports = loginRouter;
