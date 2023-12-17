// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const { addUser } = require("../controllers/signupController");

// Set router
const signupRouter = express.Router();

// Set route handlers
signupRouter
  .route("/")
  .get((req, res) => {
    DEBUG && console.log("signupRouter. GET: /signup");

    res.render("signup", { title: "Sign up" });
  })
  .post(addUser, (req, res) => {
    DEBUG && console.log("signupRouter. POST: /signup");

    const { statusCode } = res;
    const { status } = res.locals;

    let view = "signup";
    let dataObj = { title: "Sign up", status };

    if (statusCode == 503) {
      DEBUG && console.log("signupRouter. 503");

      view = "503";
      dataObj = { title: "503" };
    }

    res.render(view, dataObj);
  });

// Export the router to use in other modules
module.exports = signupRouter;
