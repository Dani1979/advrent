'use strict'
const db = require('../../lib/db')
const util = require('../../lib/util')
const debug = require('debug')('advRent:DB')
const chalk = require('chalk')


function getCategory(req, res){

const idCategory = req.params.id_category

  db.any('select * from advr_category where id_category = ${idCategory}', {
    idCategory:idCategory
  })
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`El idCategory = ${idCategory}, no existe`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getCategory]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}

function getCategories(req, res){

  db.any('select * from advr_category ')
    .then(function(data) {
      if(util.isEmptyObject(data)) return res.status(404).send({message:`La tabla advr_category esta vacia`})
      res.status(200).send(data)
    })
    .catch(function(error) {
      console.log(`${chalk.red('[advRent-getCategories]')} Error al realizar la petición: ${error}`)
      return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    })
}


function postCategory(req, res){

  const body = {
  idCcategoryParent:req.body.id_category_parent,
  categoryName:req.body.category_name,
  dateAdd:req.body.date_add 
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('INSERT INTO advrent.advr_category \
                      ( id_category_parent, category_name, date_add) \
                      VALUES(${idCcategoryParent}, ${categoryName},${dateAdd})',
                {
                  idCcategoryParent:body.idCcategoryParent,
                  categoryName:body.categoryName,
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
        console.log(`${chalk.red('[advRent-postCategory]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}


function putCategory(req, res){

  const body = {
    idCategory:req.body.id_category,
    idCcategoryParent:req.body.id_category_parent,
    categoryName:req.body.category_name
}

  db.tx(t => {
          // this.ctx = transaction config + state context;
          return t.batch([
              t.none('UPDATE advrent.advr_category \
                      SET id_category_parent=${idCcategoryParent}, category_name=${categoryName} \
                      WHERE id_category= ${idCategory} ',
                {
                  idCategory:body.idCategory,
                  idCcategoryParent:body.idCcategoryParent,
                  categoryName:body.categoryName
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
        console.log(`${chalk.red('[advRent-putCategory]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}



function deleteCategory(req, res){

  const body = {
    idCategory:req.body.id_category
}

  db.result('DELETE from  advrent.advr_category  WHERE id_category= ${idCategory} ',
      {
        idCategory:body.idCategory
      })
      .then(data => {
        if(util.isEmptyObject(data)) console.log('No se ha borrado ningun registro');
        
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(`${chalk.red('[advRent-putCategory]')} Error al realizar la petición: ${error}`)
        return res.status(500).send({message: `Error al realizar la petición: ${error}`})
      })
}





// export an object with de model function
module.exports = {
  getCategory,
  getCategories,
  postCategory,
  putCategory,
  deleteCategory
}
