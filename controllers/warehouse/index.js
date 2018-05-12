'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getWarehouse(req, res){

const idWarehouse = req.params.id_warehouse

  db.any('select * from advr_warehouse where id_warehouse = ${idWarehouse}', {
    idWarehouse:idWarehouse
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idWarehouse = ${idWarehouse}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getWarehouse]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getWarehouses(req, res){

  db.any('select * from advr_warehouse ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_warehouse esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getWarehouses]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postWarehouse(req, res){

  const body = {
    warehouseName : req.body.warehouse_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('INSERT INTO advrent.advr_warehouse \
                      ( warehouse_name ,direction ,responsible ,cif ,tlf ) \
                      VALUES(${warehouseName}, ${direction},${responsible}, ${cif},${tlf} ) ',
                {
                  warehouseName : body.warehouseName,
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
        console.log(`${chalk.red('[advRent-postWarehouse]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putWarehouse(req, res){

  const body = {
    idWarehouse:req.body.id_warehouse,
    warehouseName : req.body.warehouse_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}
  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('UPDATE advrent.advr_warehouse \
                      SET warehouse_name=${warehouseName}, \
                          direction=${direction}, \
                          responsible=${responsible}, \
                          cif=${cif}, \
                          tlf=${tlf} \
                      WHERE id_warehouse= ${idWarehouse} ',
                {
                  idWarehouse:body.idWarehouse,
                  warehouseName:body.warehouseName,
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
        console.log(`${chalk.red('[advRent-putWarehouse]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteWarehouse(req, res){

  const body = {
    idWarehouse:req.body.id_warehouse
}

  db.result('DELETE from  advrent.advr_warehouse  WHERE id_warehouse= ${idWarehouse} ',
      {
        idWarehouse:body.idWarehouse
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-deleteWarehouse]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}





// export an object with de model function
module.exports = {
  getWarehouse,
  getWarehouses,
  postWarehouse,
  putWarehouse,
  deleteWarehouse
}
