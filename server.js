'use strict';
const express = require('express');
const app = express();
const path = require("path");
const { getDBConnection } = require('./models/db-connection');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;
const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'Something went wrong on the server.';

app.use(session({
  genid: function(req, res, next) {
    return uuidv4(undefined, undefined, undefined);
  },
  secret: '7107b684f8093c3f31abdc61274f5a12740387dd7db611e1d81d523736487ecb',
  resave: false,
  saveUninitialized: true
}));

//Import Route files
const { router: userRoutes } = require('./routes/userRoutes');
const { router: cartRoutes } = require('./routes/cartRoutes');
const { router: productRoutes } = require('./routes/productRoutes');

//routes
app.get("/", (req, res) => {
  res.render('index');
});
app.use(userRoutes);
app.use(cartRoutes);
app.use(productRoutes);


//to read sql files
function readSQLFile(fileName) {
  return fs.readFileSync(fileName, 'utf-8');
}

//where we actually execute
async function executeSQLStatements(sqlStatements) {
  try {
    const db = await getDBConnection();
    for (const sqlStatement of sqlStatements) {
      await db.exec(sqlStatement);
    }
    // console.log('SQL statements executed successfully!')
  } catch (error) {
    console.error('Error executing SQL statements: ', error)

  }
}

async function initializeDatabase() {
  try {
    const createSQL = fs.readFileSync('./.data/create_tables.sql', 'utf-8');
    const createStatements = createSQL.split(';').filter(sql => sql.trim());
    await executeSQLStatements(createStatements);
    // console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
}

async function dropDatabase() {
  try {
    const dropSQL = fs.readFileSync('./.data/drop_tables.sql', 'utf-8');
    const dropStatements = dropSQL.split(';').filter(sql => sql.trim());
    await executeSQLStatements(dropStatements);
    // console.log('Database tables dropped successfully');
  } catch (error) {
    console.error('Error dropping database tables:', error);
  }
}

//start server and connect to db
async function startServer() {
  try {
    // await dropDatabase();
    await initializeDatabase();
    console.log('Database setup completed');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

startServer();