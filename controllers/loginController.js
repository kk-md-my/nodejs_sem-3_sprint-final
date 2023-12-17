// Import external packages
const bcrypt = require("bcrypt");

// Import required functions/variables from custom modules
const { getLoginByUsername } = require("../services/pg_loginsDAL");

// Middleware function to validate user credentials
const checkCredentials = async (req, res, next) => {
  const { username, password } = req.body;
  req.app.locals.isAuth = false;

  try {
    if (DEBUG) console.log("auth.getLoginByUsername().try");

    let user = await getLoginByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      req.app.locals.isAuth = true;
      req.app.locals.authStatus = "Logged in as " + user.username;
      req.app.locals.username = user.username;
    } else if (user) {
      res.locals.status = "Incorrect password was entered.";
      res.status(401);
    } else {
      res.locals.status = "Incorrect user name was entered.";
      res.status(401);
    }
  } catch (err) {
    res.status(503);
    console.log(err.message);
  }

  next();
};

// Export functions/variables to use in other modules
module.exports = {
  checkCredentials,
};
