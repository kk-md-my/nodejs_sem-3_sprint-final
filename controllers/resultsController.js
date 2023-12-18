// Import required functions/variables from custom modules
const {
  getProceduresPg,
  getProceduresMongo,
  saveSearchQuery,
} = require("../services/searchDAL");

// Middleware function for storing user's search history in the database
const saveSearch = async (req, res, next) => {
  DEBUG && console.log("saveSearch()");

  const { keyword } = req.query;
  const { username } = req.app.locals;

  try {
    if (!username) {
      throw new Error("User is not authorized");
    } else if (!keyword) {
      throw new Error("Missing keyword");
    }

    await saveSearchQuery(keyword, username);
  } catch (err) {
    res.status(username && !keyword ? 400 : !username ? 401 : 503);
    console.log(err.message);
  }

  next();
};

// Middleware function that retrieves data from the database based on user selection
const getData = async (req, res, next) => {
  DEBUG && console.log("getData()");

  const { database, keyword } = req.query;

  try {
    if (res.statusCode == 200) {
      switch (database) {
        case "postgres":
          DEBUG && console.log("getData(). case - postgres");

          res.data = await getProceduresPg(keyword);
          break;

        case "mongodb":
          DEBUG && console.log("getData(). case - mongodb");

          res.data = await getProceduresMongo(keyword);
          break;

        case "both":
          DEBUG && console.log("getData(). case - both");

          res.data = [
            ...(await getProceduresPg(keyword)),
            ...(await getProceduresMongo(keyword)),
          ];
          break;
      }
    }
  } catch (err) {
    res.status(503);
    console.log(err.message);
  }

  next();
};

// Export functions/variables to use in other modules
module.exports = {
  saveSearch,
  getData,
};
