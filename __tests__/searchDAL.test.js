// Test File for the searchDAL.js file.

// Import statements.
const pgDal = require("../services/pg_db_auth"); // Access to the Postgres DB.
const mongoDal = require("../services/mongo_db_auth"); // Access to the MongoDB.
const searchDAL = require("../services/searchDAL"); // Access to the searchDAL.js file.
global.DEBUG = true; // Set DEBUG to true.

// Require statements.
require("dotenv").config();
const { MongoClient } = require("mongodb");

describe("Ensuring there is a connection to the Pg Database", () => {
  let rowCount = 0;
  let result;
  beforeAll(async () => {
    result = await pgDal.query("SELECT COUNT(*) FROM procedures"); // Assign value to result here
    rowCount = parseInt(result.rows[0].count);
  });

  it("Should return greater than 0 rows to ensure data is returned", async () => {
    expect(rowCount).toBeGreaterThan(0);
  });
});

describe("Ensuring there is a connection to the MongoDB Database", () => {
  let rowCount = 0;
  let client;

  beforeAll(async () => {
    try {
      client = await mongoDal.connect();
      const database = client.db("procedures");
      const collection = database.collection("procedures");
      rowCount = await collection.countDocuments({});
    } finally {
      if (client) {
        await client.close();
      }
    }
  });

  it("Should return greater than 0 rows to ensure data is returned", () => {
    expect(rowCount).toBeGreaterThan(0);
  });
});

describe("Pg Database: The getProceduresPg function returns the correct results when queried", () => {
  beforeAll(async () => {
    result = await pgDal.query("SELECT COUNT(*) FROM procedures");
    rowCount = parseInt(result.rows[0].count);
  });
  it("The query :ankle: should return 6 results", async () => {
    const result = await searchDAL.getProceduresPg("ankle");
    expect(result.length).toEqual(6);
  });
});

describe("Mongo Database: The getProceduresMongo function returns the correct results when queried", () => {
  it("The query :hand: should return 8 results", async () => {
    const result = await searchDAL.getProceduresMongo("hand");
    expect(result.length).toEqual(8);
  });
});

describe("The save search function writes a log to the user_search table", () => {
  beforeAll(async () => {
    await searchDAL.saveSearchQuery("test", "test_user");
  });
  it("Should write a new search entry to the user_search table", async () => {
    const userMatch = await pgDal.query(
      "SELECT * FROM user_search WHERE username = $1",
      ["test_user"]
    );
    expect(userMatch.rows[0].username).toEqual("test_user");
    // Delete the test entry
    await pgDal.query("DELETE FROM user_search WHERE username = $1", [
      "test_user",
    ]);
  });
});
