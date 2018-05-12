'use strict'


const express = require('express');
//create a router to route our end points
const router = express.Router()
//import functions controllers
const categoryCtrl = require('../../controllers/categories');
// import middleware to validate sesion token
//const auth = require('../middelwares/auth');

//end point to get category
router.get('/category/:id_category',categoryCtrl.getCategory)
//end point to get all category
router.get('/categories',categoryCtrl.getCategories)
//end point to update category
router.put('/category',categoryCtrl.putCategory)
//end point to insert category
router.post('/category',categoryCtrl.postCategory)
//end point to delete category
router.delete('/category',categoryCtrl.deleteCategory)

module.exports = router
