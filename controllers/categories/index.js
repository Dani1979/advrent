'use strict'
//const db = require('../../lib/db')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')
const Promise = require('bluebird')
const conf = require('../../config')
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

const  db = pgp(cn)


function getCategory(req, res){

  console.log(`${chalk.green('[advRent-getCategory]')} Params Vale: ${JSON.stringify(req.params)}`)

  db.any('select * from advrent.advr_category where id_category = ${idCategory}', {
    idCategory:req.params.idCategory
  })
    .then(function(data) {
      if(!data) return res.status(404).send({message:`La categoria no existe: ${idCategory}`})
      console.log(`${chalk.green('[advRent-getCategory]')} Data vlae: ${data}`)
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getCategory]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


// export an object with de model function
module.exports = {
  getCategory
}
