// const dal = require("./p.db.js");
const dal = require("./pg_db_auth");

async function addLogin(name, hashedPassword) {
  let SQL = `INSERT INTO public."Logins"(username, password)
      VALUES ($1, $2);`;
  try {
    await dal.query(SQL, [name, hashedPassword]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getLoginByUsername(username) {
  let SQL = `SELECT * FROM public."Logins" WHERE username = $1`;
  try {
    let results = await dal.query(SQL, [username]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  addLogin,
  getLoginByUsername,
};
