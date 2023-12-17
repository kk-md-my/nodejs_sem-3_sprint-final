const dal = require("./pg_db_auth");

async function addLogin(name, hashedPassword) {
  let SQL = `INSERT INTO public."Logins"(username, password)
      VALUES ($1, $2);`;
  try {
    await dal.query(SQL, [name, hashedPassword]);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function getLoginByUsername(username) {
  let SQL = `SELECT * FROM public."Logins" WHERE username = $1`;
  try {
    let results = await dal.query(SQL, [username]);
    return results.rows[0];
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

module.exports = {
  addLogin,
  getLoginByUsername,
};
