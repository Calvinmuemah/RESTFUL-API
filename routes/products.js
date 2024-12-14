const express = require("express")
const router = express.Router()
const product = require("../models/productModel")
const Product = require("../models/productModel")

const controller = require('../controller/controller')

// how to get all the data from the database
router.get('/', controller.getAllProducts)

// method 2 using promises
router.post('/', controller.createNewProduct)
// get data by id
router.get('/:id', controller.findProductById)
router.patch('/:id', controller.updateProductById)
router.delete('/:id', controller.deleteProductById)
module.exports = router;