// Import Statements
const pgDal = require("./pg_db_auth");
const { ObjectId } = require("mongodb");
const mongoDal = require("./mongo_db_auth");
const uuid = require("uuid");
const getDate = require("./utils");

// Function to get procedures from Postgres DB based on user query.
var getProceduresPg = function (keyword) {
  if (DEBUG) console.log("dal.getProceduresPg()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM procedures WHERE name ILIKE $1";
    pgDal.query(sql, [`%${keyword}%`], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Function to save the search query from a user. Implements a uuid and the formatted date function from /utils. Parameters include the query which comes from the req body of the search bar, and the user id, which will be an sql statement based on session user name.
var saveSearchQuery = function (query, user) {
  if (DEBUG) console.log("dal.saveSearchQuery()");
  return new Promise(function (resolve, reject) {
    let searchUuid = uuid.v4();
    let today = getDate.getFormattedToday();
    const sql =
      'INSERT INTO user_search (id, user_id, keywords, "timestamp") VALUES ($1, $2, $3, $4)';
    pgDal.query(sql, [searchUuid, user, query, today], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Function to retrieve procedures from the MongoDB. The keyword parameter comes from the req.body of the search page.
async function getProceduresMongo(keyword) {
  if (DEBUG) console.log("dal.getProceduresMongo()");
  try {
    await mongoDal.connect();
    // Create a query object to filter by name using the provided keyword
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    // Use the query object in the find method
    const cursor = mongoDal
      .db("procedures")
      .collection("procedures")
      .find(query);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  } finally {
    mongoDal.close();
  }
}

// Function to retrieve procedures from either database or both if the user selects it. The function uses else/if statements, could also be implemented as a switch statement dependent on style preference.
const procedureSearch = async function (keyword, database) {
  if (database === "postgres") {
    // Implement the Postgres Search.
    return await getProceduresPg(keyword);
  } else if (database === "mongodb") {
    // Implement the MongoDB Search.
    return await getProceduresMongo(keyword);
  } else if (database === "both") {
    // If both databases, implement both searches.
    const pgResults = await getProceduresPg(keyword);
    const mongoResults = await getProceduresMongo(keyword);

    // Combine results from both databases
    const combinedResults = pgResults.concat(mongoResults);
    return combinedResults;
  } else {
    // Handle unsupported database --- Shouldn't be in issue with the way our form is set up.
    throw new Error("Unsupported database type");
  }
};

module.exports = {
  getProceduresPg,
  getProceduresMongo,
  saveSearchQuery,
  procedureSearch,
};
