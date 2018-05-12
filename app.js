'use strict'

// import the necessary libraries
const express = require('express');
const bodyparser = require('body-parser');
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')
const asyncify = require('express-asyncify')
//create a express variable
const app = asyncify(express())
//only require the folder because de file name index.js
const categories = require('./routes/categories');
const suppliers = require('./routes/suppliers');
const manufacturer = require('./routes/manufacturer');
const warehouse = require('./routes/warehouse');
const attribute = require('./routes/attributes');
const product = require('./routes/product');
// with bodyparser librarie, parse json message
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
//API Routes
app.use('/api',categories)
app.use('/api',suppliers)
app.use('/api',manufacturer)
app.use('/api',warehouse)
app.use('/api',attribute)
app.use('/api',product)
// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

module.exports = app
