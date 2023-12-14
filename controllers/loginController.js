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

    // Check if user is undefined or null
    if (!user) {
      req.app.locals.status = "Incorrect user name was entered.";
      return res.status(401).send({ error: "Incorrect user name" });
    }

    // Use bcrypt.compare to compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.app.locals.user = user;
      req.app.locals.status = "Logged in as " + user.username;
    } else {
      req.app.locals.status = "Incorrect password was entered.";
      return res.status(401).send({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(503).send({ error: "Service unavailable" });
  }

  next();
};

module.exports = {
  checkCredentials,
};
