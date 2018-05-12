'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getProduct(req, res){

const idProduct = req.params.id_product

  db.any('select * from advr_product where id_product = ${idProduct}', {
    idProduct:idProduct
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idProduct = ${idProduct}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getProduct]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getProducts(req, res){

  db.any('select * from advr_product ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_product esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getProducts]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postProduct(req, res){

  const body = {
    idSupplier : req.body.id_supplier,
    idManufacturer : req.body.id_manufacturer,
    idCategory : req.body.id_category,
    unitPrice : req.body.unit_price,
    price : req.body.price,
    rentPrice : req.body.rent_price,
    reference : req.body.reference,
    manufacturerReference : req.body.manufacturer_reference,
    productName : req.body.product_name,
    idWarehouse : req.body.id_warehouse,
    width : req.body.width,
    height : req.body.height,
    depth : req.body.depth,
    weight : req.body.weight,
    idColor : req.body.id_color,
    dateAdd : req.body.date_add,
    dateUpd : req.body.date_upd,
    idState : req.body.id_state
}

  db.tx(t => {
          return t.batch([
              t.none('INSERT INTO advrent.advr_product \
                      ( id_supplier ,id_manufacturer ,id_category ,unit_price ,price ,rent_price , \
                      reference ,manufacturer_reference ,product_name ,id_warehouse ,width ,height ,depth ,weight , \
                      id_color ,date_add ,date_upd ,id_state ) \
                      VALUES(${idSupplier} , ${idManufacturer}, ${idCategory}, ${unitPrice}, ${price}, ${rentPrice}, \
                      ${reference}, ${manufacturerReference}, ${productName}, ${idWarehouse}, ${width}, ${height},   \
                      ${depth}, ${weight}, ${idColor}, ${dateAdd}, ${dateUpd}, ${idState} ) ',
                {
                  idSupplier : body.idSupplier,
                  idManufacturer : body.idManufacturer,
                  idCategory : body.idCategory,
                  unitPrice : body.unitPrice,
                  price : body.price,
                  rentPrice : body.rentPrice,
                  reference : body.reference,
                  manufacturerReference : body.manufacturerReference,
                  productName : body.productName,
                  idWarehouse : body.idWarehouse,
                  width : body.width,
                  height : body.height,
                  depth : body.depth,
                  weight : body.weight,
                  idColor : body.idColor,
                  dateAdd : body.dateAdd,
                  dateUpd : body.dateUpd,
                  idState : body.idState
                }
              )
          ]);
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha insertado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-postProduct]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putProduct(req, res){

  const body = {
    idProduct : req.body.id_product,
    idSupplier : req.body.id_supplier,
    idManufacturer : req.body.id_manufacturer,
    idCategory : req.body.id_category,
    unitPrice : req.body.unit_price,
    price : req.body.price,
    rentPrice : req.body.rent_price,
    reference : req.body.reference,
    manufacturerReference : req.body.manufacturer_reference,
    productName : req.body.product_name,
    idWarehouse : req.body.id_warehouse,
    width : req.body.width,
    height : req.body.height,
    depth : req.body.depth,
    weight : req.body.weight,
    idColor : req.body.id_color,
    dateAdd : req.body.date_add,
    dateUpd : req.body.date_upd,
    idState : req.body.id_state
}
  db.tx(t => {
          return t.batch([
              t.none('UPDATE advrent.advr_product \
                      SET \
                        id_supplier = ${idSupplier} , \
                        id_manufacturer = ${idManufacturer} , \
                        id_category = ${idCategory} , \
                        unit_price = ${unitPrice} , \
                        price = ${price} , \
                        rent_price = ${rentPrice} , \
                        reference = ${reference} , \
                        manufacturer_reference = ${manufacturerReference} , \
                        product_name = ${productName} , \
                        id_warehouse = ${idWarehouse} , \
                        width = ${width} , \
                        height = ${height} , \
                        depth = ${depth} , \
                        weight = ${weight} , \
                        id_color = ${idColor} , \
                        date_add = ${dateAdd} , \
                        date_upd = ${dateUpd} , \
                        id_state = ${idState} \
                      WHERE id_product= ${idProduct} ' ,
                {
                  idProduct : body.idProduct,
                  idSupplier : body.idSupplier,
                  idManufacturer : body.idManufacturer,
                  idCategory : body.idCategory,
                  unitPrice : body.unitPrice,
                  price : body.price,
                  rentPrice : body.rentPrice,
                  reference : body.reference,
                  manufacturerReference : body.manufacturerReference,
                  productName : body.productName,
                  idWarehouse : body.idWarehouse,
                  width : body.width,
                  height : body.height,
                  depth : body.depth,
                  weight : body.weight,
                  idColor : body.idColor,
                  dateAdd : body.dateAdd,
                  dateUpd : body.dateUpd,
                  idState : body.idState
                }
              )
          ])
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha actualizado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-putProduct]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteProduct(req, res){

  const body = {
    idProduct:req.body.id_product
}

  db.result('DELETE from  advr_product  WHERE id_product= ${idProduct} ',
      {
        idProduct:body.idProduct
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-deleteProduct]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


// export an object with de model function
module.exports = {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct
}
