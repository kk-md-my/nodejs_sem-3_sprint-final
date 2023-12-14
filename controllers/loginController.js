// Import external packages
const bcrypt = require("bcrypt");

// Import required functions/variables from custom modules
const { getLoginByUsername } = require("../services/pg_loginsDAL");

// Middleware function to validate user credentials
const checkCredentials = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (DEBUG) console.log("auth.getLoginByUsername().try");
    let user = await getLoginByUsername(username);

    if (user === undefined) {
      req.app.locals.status = "Incorrect user name was entered.";
      res.status(401);
    }

    if (await bcrypt.compare(password, user.password)) {
      req.app.locals.user = user;
      req.app.locals.status = "Logged in as " + user.username;
    } else {
      req.app.locals.status = "Incorrect password was entered.";
      res.status(401);
    }
  } catch (error) {
    res.status(503);
    console.log(error);
  }

  next();
};

module.exports = {
  checkCredentials,
};
