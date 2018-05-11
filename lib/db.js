const Promise = require('bluebird')
const conf = require('../config')
const initOptions = {
    promiseLib: Promise,
    schema:conf.schema
};
const pgp = require('pg-promise')(initOptions)
var db = null
const cn = {
    host: conf.host,
    port: conf.dbPort,
    database: conf.database,
    user: conf.user,
    password: conf.pass
};
// si no esta instanciado el objecto de BD los instanciamos
if(!db) db = pgp(cn)


module.exports = db
