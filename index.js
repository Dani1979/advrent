'use strict'

const app = require('./app')
const conf = require('./config')
const Promise = require('bluebird')
const chalk = require('chalk')

const initOptions = {
    promiseLib: Promise,
    schema:conf.schema
};
const pgp = require('pg-promise')(initOptions)

const cn = {
    host: conf.host,
    port: conf.dbPort,
    database: conf.database,
    user: conf.user,
    password: conf.pass
};


const db = pgp(cn)

db.any('select * from advrent.advr_category', [true])
    .then(function(data) {
        console.log(`${chalk.green('[advRent-DB]')} Conexion DB OK. Data vale ${JSON.stringify(data)}`)
    })
    .catch(function(error) {
        console.log(`${chalk.red('[advRent-DB]')} Conexion DB KO. err: ${error}`)

    });

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}


  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  app.listen(conf.port, () => {
    console.log(`${chalk.green('[advRent-DB]')} server listening on port ${conf.port}`)
  })



