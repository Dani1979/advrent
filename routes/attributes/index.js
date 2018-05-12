'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const attributeCtrl = require('../../controllers/attributes');
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get attribute
router.get('/attribute/:id_attribute',attributeCtrl.getAttribute)
//end point to get all attribute
router.get('/attributes',attributeCtrl.getAttributes)
//end point to update attribute
router.put('/attribute',attributeCtrl.putAttribute)
//end point to insert attribute
router.post('/attribute',attributeCtrl.postAttribute)
//end point to delete attribute
router.delete('/attribute',attributeCtrl.deleteAttribute)

module.exports = router
