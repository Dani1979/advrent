'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const categoryCtrl = require('../../controllers/categories');
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/category/:idCategory/:color',categoryCtrl.getCategory)

module.exports = router
