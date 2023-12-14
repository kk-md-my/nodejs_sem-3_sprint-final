// Import external packages
const express = require("express");
const bcrypt = require("bcrypt");

// Set router
const indexRouter = express.Router();

// Set route handlers
indexRouter.get("^/$|^/home$", (req, res) => {
  res.render("index");
});

const { getLoginByUsername } = require("../services/pg_loginsDAL");

// log in
indexRouter.post("/", async (req, res) => {
  try {
    if (DEBUG) console.log("auth.getLoginByUsername().try");
    let user = await getLoginByUsername(req.body.username);
    if (user === undefined) {
      req.app.locals.status = "Incorrect user name was entered.";
      res.redirect("/");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.app.locals.user = user;
      req.app.locals.status = "Logged in as " + user.username;
      res.redirect("/search");
    } else {
      req.app.locals.status = "Incorrect password was entered.";
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.render("503");
  }
});

// Export the router to use in other modules
module.exports = indexRouter;
