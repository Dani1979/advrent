'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const supplierCtrl = require('../../controllers/suppliers');
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/supplier/:idSupplier',supplierCtrl.getSupplier)
//end point to get all category
router.get('/suppliers',supplierCtrl.getSuppliers)
//end point to update category
router.put('/supplier',supplierCtrl.putSupplier)
//end point to insert category
router.post('/supplier',supplierCtrl.postSupplier)
//end point to delete category
router.delete('/supplier',supplierCtrl.deleteSupplier)

module.exports = router
