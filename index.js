'use strict'

const debug = require('debug')('platziverse:api')
const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())


app.use('/api', api)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

// Este if permite requerir como un modulo el API sin necesidad de que levante el servidor
//si no esta requerido levantamos sel servidor ene l puerto correspondiente
if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  app.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
  })
}

module.exports = app