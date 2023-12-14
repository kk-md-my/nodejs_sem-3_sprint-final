// Import external packages
const express = require("express");
const bcrypt = require("bcrypt");

// Set router
const signupRouter = express.Router();

// Set route handlers
signupRouter.get("/", (req, res) => {
  if (DEBUG) console.log("register page");
  res.render("register");
});

const { addLogin } = require("../services/pg_loginsDAL");

signupRouter.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.username && req.body.password) {
      var result = await addLogin(req.body.username, hashedPassword);
      if (DEBUG) console.log("result: " + result);
      if (result === "23505") {
        if (DEBUG) console.log("Username already exists, please try another.");
        req.app.locals.status = "Username already exists, please try another.";
        res.redirect("/signup");
      } else {
        req.app.locals.status = "New account created, please login.";
        res.redirect("/");
      }
    } else {
      if (DEBUG) console.log("Not enough form fields completed.");
      req.app.locals.status = "Not enough form fields completed.";
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.render("503");
  }
});

// Export the router to use in other modules
module.exports = signupRouter;
