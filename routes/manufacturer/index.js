'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const manufacturerCtrl = require('../../controllers/manufacturer')
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/manufacturer/:id_manufacturer',manufacturerCtrl.getManufacturer)
//end point to get all category
router.get('/manufacturers',manufacturerCtrl.getManufacturers)
//end point to update category
router.put('/manufacturer',manufacturerCtrl.putManufacturer)
//end point to insert category
router.post('/manufacturer',manufacturerCtrl.postManufacturer)
//end point to delete category
router.delete('/manufacturer',manufacturerCtrl.deleteManufacturer)

module.exports = router

