'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getSupplier(req, res){

const idSupplier = req.params.idSupplier

  db.any('select * from advr_supplier where id_supplier = ${idSupplier}', {
    idSupplier:idSupplier
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idSupplier = ${idSupplier}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getSupplier]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getSuppliers(req, res){

  db.any('select * from advr_supplier ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_supplier esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getSuppliers]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postSupplier(req, res){

  const body = {
    supplierName : req.body.supplier_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('INSERT INTO advrent.advr_supplier \
                      ( supplier_name ,direction ,responsible ,cif ,tlf ) \
                      VALUES(${supplierName}, ${direction},${responsible}, ${cif},${tlf} ) ',
                {
                  supplierName : body.supplierName,
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
        console.log(`${chalk.red('[advRent-postSupplier]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putSupplier(req, res){

  const body = {
    idSupplier:req.body.id_supplier,
    supplierName : req.body.supplier_name,
    direction : req.body.direction,
    responsible : req.body.responsible,
    cif : req.body.cif,
    tlf : req.body.tlf
}
  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('UPDATE advrent.advr_supplier \
                      SET supplier_name=${supplierName}, \
                          direction=${direction}, \
                          responsible=${responsible}, \
                          cif=${cif}, \
                          tlf=${tlf} \
                      WHERE id_supplier= ${idSupplier} ',
                {
                  idSupplier:body.idSupplier,
                  supplierName:body.supplierName,
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
        console.log(`${chalk.red('[advRent-putSupplier]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteSupplier(req, res){

  const body = {
    idSupplier:req.body.id_supplier
}

  db.result('DELETE from  advrent.advr_supplier  WHERE id_supplier= ${idSupplier} ',
      {
        idSupplier:body.idSupplier
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-putSupplier]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}





// export an object with de model function
module.exports = {
  getSupplier,
  getSuppliers,
  postSupplier,
  putSupplier,
  deleteSupplier
}
