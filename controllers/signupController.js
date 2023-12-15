// Import external packages
const bcrypt = require("bcrypt");

// Import required functions/variables from custom modules
const { addLogin } = require("../services/pg_loginsDAL");

// Middleware function adds new user to the database
const addUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (username && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await addLogin(username, hashedPassword);

      res.locals.status =
        "New account created, <a href='/login'>please login.</a>";
      res.status(201);
    } else {
      res.locals.status = "Not enough form fields completed.";
      res.status(400);
    }
  } catch (error) {
    console.log(error);

    if (error.code === "23505") {
      res.locals.status = "Username already exists, please try another.";
      res.status(409);
    } else {
      res.status(503);
    }
  }

  next();
};

// Export functions/variables to use in other modules
module.exports = {
  addUser,
};
