'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const productCtrl = require('../../controllers/product')
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/product/:id_product',productCtrl.getProduct)
//end point to get all category
router.get('/products',productCtrl.getProducts)
//end point to update category
router.put('/product',productCtrl.putProduct)
//end point to insert category
router.post('/product',productCtrl.postProduct)
//end point to delete category
router.delete('/product',productCtrl.deleteProduct)

module.exports = router
