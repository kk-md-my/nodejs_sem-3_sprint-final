// Import external packages
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");

// Import routes from custom modules
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const searchRouter = require("./routes/searchRouter");
const resultsRouter = require("./routes/resultsRouter");
const notFoundRouter = require("./routes/notFoundRouter");

// Set app
global.DEBUG = true;
const app = express();
app.set("view engine", "ejs");

// Set middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Set routes
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/search", searchRouter);
app.use("/results", resultsRouter);
app.use("/*", notFoundRouter);

// Export the app to use in other modules
module.exports = app;
