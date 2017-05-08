// @flow
// PG Promise setup
require('dotenv').config();

const connection = {
  host: 'localhost',
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
};

const db = require('knex')({
  connection: connection,
  client: 'pg'
});

module.exports = db;
