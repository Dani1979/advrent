const Promise = require('bluebird')
const conf = require('../config')
const initOptions = {
    promiseLib: Promise,
    schema:conf.schema
};
const pgp = require('pg-promise')(initOptions)
const db = null
const cn = {
    host: conf.host,
    port: conf.dbPort,
    database: conf.database,
    user: conf.user,
    password: conf.pass
};

module.exports = function(){
  db = pgp(cn)
  return db
}

