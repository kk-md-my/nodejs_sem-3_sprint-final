// const dal = require("./p.db.js");
const dal = require("./pg_db_auth");

async function addLogin(name, hashedPassword) {
  let SQL = `INSERT INTO public."Logins"(username, password)
      VALUES ($1, $2);`;
  try {
    let results = await dal.query(SQL, [name, hashedPassword]);
    return results.rows[0].id;
  } catch (error) {
    if (error.code === "23505")
      // duplicate username
      return error.code;
    console.log(error);
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
