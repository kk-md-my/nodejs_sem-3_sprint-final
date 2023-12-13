// Import Statements
const pgDal = require("./pg_db_auth");
const { ObjectId } = require("mongodb");
const mongoDal = require("./mongo_db_auth");

// This returns queries based on the given keyword.
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

// Query Mongo DB results by keyword
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

module.exports = { getProceduresPg, getProceduresMongo };
