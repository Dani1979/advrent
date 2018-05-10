'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getCategory(req, res){

const idCategory = req.params.idCategory

  db.any('select * from advrent.advr_category where id_category = ${idCategory}', {
    idCategory:idCategory
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idCategory = ${idCategory}, no existe`})
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
