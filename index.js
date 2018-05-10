'use strict'

const app = require('./app')
const conf = require('./config')
const chalk = require('chalk')


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



