// PG Promise setup
require('dotenv').config();
var promise = require('bluebird');
var options = {
    promiseLib: promise,
    connect: function (client, dc, isFresh) {
      if (isFresh) {
        var cp = client.connectionParameters;
        console.log("Connected to database:", cp.database);
      }
    }
};
var pgp = require('pg-promise')(options);
var connection = {
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD
};
var db = pgp(connection);
db.connect();
module.exports = db;