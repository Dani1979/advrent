'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getAttribute(req, res){

const idAttribute = req.params.id_attribute

  db.any('select * from advr_attribute where id_attribute = ${idAttribute}', {
    idAttribute:idAttribute
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idAttribute = ${idAttribute}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getAttribute]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getAttributes(req, res){

  db.any('select * from advr_attribute ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_attribute esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getAttributes]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postAttribute(req, res){

  const body = {
  value:req.body.value,
  attributeName:req.body.attribute_name,
  dateAdd:req.body.date_add 
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('INSERT INTO advrent.advr_attribute \
                      ( attribute_name,  value,date_add) \
                      VALUES( ${attributeName},${value}, ${dateAdd} )',
                {
                  value:body.value,
                  attributeName:body.attributeName,
                  dateAdd:body.dateAdd 
                }
              )
              //t.none('INSERT INTO audit(status, id) VALUES($1, $2)', ['active', 123])
          ]);
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha insertado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-postAttribute]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putAttribute(req, res){

  const body = {
    idAttribute:req.body.id_attribute,
    value:req.body.value,
    attributeName:req.body.attribute_name
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('UPDATE advrent.advr_attribute \
                      SET value=${value}, attribute_name=${attributeName} \
                      WHERE id_attribute= ${idAttribute} ',
                {
                  idAttribute:body.idAttribute,
                  value:body.value,
                  attributeName:body.attributeName
                }
              )
              //t.none('INSERT INTO audit(status, id) VALUES($1, $2)', ['active', 123])
          ]);
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha actualizado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-putAttribute]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteAttribute(req, res){

  const body = {
    idAttribute:req.body.id_attribute
}

  db.result('DELETE from  advrent.advr_attribute  WHERE id_attribute= ${idAttribute} ',
      {
        idAttribute:body.idAttribute
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-putAttribute]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}





// export an object with de model function
module.exports = {
  getAttribute,
  getAttributes,
  postAttribute,
  putAttribute,
  deleteAttribute
}
