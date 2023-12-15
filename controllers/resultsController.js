// Import required functions/variables from custom modules
const {
  getProceduresPg,
  getProceduresMongo,
  saveSearchQuery,
} = require("../services/searchDAL");

// Middleware function that retrieves data from the database based on user selection
const getData = async (req, res, next) => {
  const { database, keyword } = req.query;
  try {
    switch (database) {
      case "postgres":
        res.data = await getProceduresPg(keyword);
        break;

      case "mongodb":
        res.data = await getProceduresMongo(keyword);
        break;

      case "both":
        res.data = [
          ...(await getProceduresPg(keyword)),
          ...(await getProceduresMongo(keyword)),
        ];
        break;
    }
  } catch (err) {
    res.status(503);
    console.log(err.message);
  }

  next();
};

const saveSearch = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    await saveSearchQuery(keyword, req.app.locals.username);
  } catch (err) {
    console.log(err.message);
  }
  next();
};

module.exports = {
  getData,
  saveSearch,
};
