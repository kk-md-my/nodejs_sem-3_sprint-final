// Import required functions/variables from custom modules
const {
  getProceduresPg,
  getProceduresMongo,
} = require("../services/total_dal");

const getData = async (req, res, next) => {
  const { database, keyword } = req.body;

  try {
    switch (database) {
      case "postgres":
        res.data = await getProceduresPg(keyword);
        break;

      case "mongodb":
        res.data = await getProceduresMongo(keyword);
        break;

      default:
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

module.exports = {
  getData,
};
