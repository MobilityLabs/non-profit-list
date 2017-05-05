// PG Promise setup
require('dotenv').config();

var connection = {
  host: 'localhost',
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
};

var db = require('knex')({
  connection: connection,
  client: 'pg'
});

module.exports = db;