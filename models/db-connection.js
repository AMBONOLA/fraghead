const sqlite3 = require('sqlite3')
const sqlite = require('sqlite');

/**
* Establishes a database connection to a database and returns the database object.
* Any errors that occur during connection should be caught in the function
* that calls this one.
* @returns {Object} - The database object for the connection.
*/
async function getDBConnection() {
  const db = await sqlite.open({
    filename: './.data/SofiScent.db',
    driver: sqlite3.Database
  });
  return db;
}

module.exports = {
  getDBConnection
};