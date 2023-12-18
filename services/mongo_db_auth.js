const { MongoClient } = require("mongodb");

const atlasUrl = "mongodb+srv://sprint:sprint@procedures.6ezy3p2.mongodb.net/";
const pool = new MongoClient(atlasUrl);

module.exports = pool;
