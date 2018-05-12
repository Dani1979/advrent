'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const warehouseCtrl = require('../../controllers/warehouse')
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/warehouse/:id_warehouse',warehouseCtrl.getWarehouse)
//end point to get all category
router.get('/warehouses',warehouseCtrl.getWarehouses)
//end point to update category
router.put('/warehouse',warehouseCtrl.putWarehouse)
//end point to insert category
router.post('/warehouse',warehouseCtrl.postWarehouse)
//end point to delete category
router.delete('/warehouse',warehouseCtrl.deleteWarehouse)

module.exports = router
