'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getManufacturer(req, res){

const idManufacturer = req.params.id_manufacturer

  db.any('select * from advr_manufacturer where id_manufacturer = ${idManufacturer}', {
    idManufacturer:idManufacturer
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idManufacturer = ${idManufacturer}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getManufacturer]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getManufacturers(req, res){

  db.any('select * from advr_manufacturer ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_manufacturer esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getManufacturers]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postManufacturer(req, res){

  const body = {
    manufacturerName : req.body.manufacturer_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('INSERT INTO advrent.advr_manufacturer \
                      ( manufacturer_name ,direction ,responsible ,cif ,tlf ) \
                      VALUES(${manufacturerName}, ${direction},${responsible}, ${cif},${tlf} ) ',
                {
                  manufacturerName : body.manufacturerName,
                  direction : body.direction,
                  responsible : body.responsible,
                  cif : body.cif,
                  tlf : body.tlf
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
        console.log(`${chalk.red('[advRent-postManufacturer]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putManufacturer(req, res){

  const body = {
    idManufacturer:req.body.id_manufacturer,
    manufacturerName : req.body.manufacturer_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}
  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('UPDATE advrent.advr_manufacturer \
                      SET manufacturer_name=${manufacturerName}, \
                          direction=${direction}, \
                          responsible=${responsible}, \
                          cif=${cif}, \
                          tlf=${tlf} \
                      WHERE id_manufacturer= ${idManufacturer} ',
                {
                  idManufacturer:body.idManufacturer,
                  manufacturerName:body.manufacturerName,
                  direction:body.direction,
                  responsible:body.responsible,
                  tlf:body.tlf,
                  cif:body.cif
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
        console.log(`${chalk.red('[advRent-putManufacturer]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteManufacturer(req, res){

  const body = {
    idManufacturer:req.body.id_manufacturer
}

  db.result('DELETE from  advrent.advr_manufacturer  WHERE id_manufacturer= ${idManufacturer} ',
      {
        idManufacturer:body.idManufacturer
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-deleteManufacturer]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}





// export an object with de model function
module.exports = {
  getManufacturer,
  getManufacturers,
  postManufacturer,
  putManufacturer,
  deleteManufacturer
}
