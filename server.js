'use strict';
const express = require('express');
const app = express();
const path=require("path");
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const fs = require('fs');
const multer = require('multer');
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;
const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'Something went wrong on the server.';

//to read sql files
function readSQLFile(fileName) {
  return fs.readFileSync(fileName, 'utf-8');
}

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

//where we actually execute
async function executeSQLStatements(sqlStatements) {
  try {
    const db = await getDBConnection();
    for (const sqlStatement of sqlStatements) {
      await db.exec(sqlStatement);
    }
    console.log('SQL statements executed successfully!')
  } catch (error) {
    console.error('Error executing SQL statements: ', error)

  }
}

//read create_tables.sql
async function createDatabase() {
  const createSQL = readSQLFile('./database/create_tables.sql');
  const sqlStatements = createSQL.split(';').filter(sql => sql.trim()); // Split statements
  await executeSQLStatements(sqlStatements);
}

//read dro_tables
async function dropDatabase() {
  const dropSQL = readSQLFile('./database/drop_tables.sql');
  const sqlStatements = dropSQL.split(';').filter(sql => sql.trim()); // Split statements
  await executeSQLStatements(sqlStatements);
}


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    // await dropDatabase() //in case we want to drop first
    // await createDatabase();
    console.log('pretend it connects to db')
  } catch (error) {
    console.error('Error creating database:', error);
  }
});