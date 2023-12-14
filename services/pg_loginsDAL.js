const dal = require("./p.db.js");

async function addLogin(name, hashedPassword) {
  let SQL = `INSERT INTO public."Logins"(username, password)
      VALUES ($1, $2)
      RETURNING id;`;

  try {
    let results = await dal.query(SQL, [name, hashedPassword]);
    if (results.rows.length > 0) {
      // Check if any rows were returned
      return results.rows[0].id;
    } else {
      // Handle the case where no rows were returned
      console.error("No rows returned after insertion");
      return null;
    }
  } catch (error) {
    if (error.code === "23505") {
      // Duplicate username
      return error.code;
    } else {
      // Handle other errors
      console.error(error);
      throw error; // Re-throw the error for further handling or logging
    }
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
