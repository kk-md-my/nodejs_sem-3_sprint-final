const { MongoClient } = require("mongodb");
require("dotenv").config();

const atlasUrl = process.env.MONGOURL;

const pool = new MongoClient(atlasUrl);

module.exports = pool;
