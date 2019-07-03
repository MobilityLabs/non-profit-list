// PG Promise setup
require('dotenv').config()

const connection = {
  host: 'localhost',
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}

const db = require('knex')({
  connection,
  client: 'pg'
})

module.exports = db
