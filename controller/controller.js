const createError = require("http-errors")
const mongoose = require("mongoose")
const Product = require('../models/productModel')

module.exports = {
    getAllProducts:async(req, res, next) =>{
        try {
            const product = await new Product.find({/*query*/}, {/*projection(the field that you don't want to sent the users eg.."__v: 0")*/ name: 1, price: 1, id: 0})
            // const product = await new Product.find({/*query*/}, {/*projection(the field that you want to send to users only eg.."name: 1, price: 1, id: 0")*/})
            // const product = await new Product.find({/*query eg "price: 699"*/}, {/*projection(the field that you don't want to sent the users eg.."__v: 0")*/})
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
        
    },
    createNewProduct: (req, res, next) =>{
        // method 1 using promises
        // creating a new product
        console.log(req.body)
        const product = new Product({
            name: req.body.name,
            price: req.body.price
        })
        product.save()
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            console.log(err.message)
            if (error.name === 'validationError') {
                next(createError(422, error.message))
                return
            }
            next(Error)
        })
        
    }
    // method 2 using async & await
// router.post('/', async(req, res, next) =>{
//     // creating a new product
//     try {
//         const product = new Product(req.body)
//         const result = await product.save()
//         res.send(result)
//     } catch (error) {
//         console.log(error.message)
//     }
   
    
// })
,
    findProductById:async (req, res, next) =>{
        const id = req.params.id
        // to fetch data from that id
        try {
            const product = await Product.findById(id)
            // console.log(product)
            if (!product) {
                throw createError(404, 'Product does not exist...')
            }
            res.send(product)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.castError) {
                next(createError(404, 'Invalid product Id'))
                return;  
            }  
            next(error)//"will go to error handler in app.js"
        }
        // console.log(id)
        // res.send(id)
        // res.send('getting a single id...')
    },
    updateProductById:async (req, res, next) =>{
        try {
            const id = req.params.id
            const updates = req.body
            // to return the updated object
            const options = {new: true}
    
            const result = await Product.findByIdAndUpdate(id, updates, options)
            if (!result) {
                throw createError(404, 'Product does not exist...')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.castError) {
                return next(createError(404, 'Invalid product Id')) 
            }
            next(error)  
        }
         // res.send('updating a single id...')
        
    },
    deleteProductById:async (req, res, next) =>{
        const id = req.params.id
        try {
            const result = await Product.findByIdAndDelete(id)
            res.send(result)
            if (!result) {
                throw createError(404, 'Product does not exist...')
            }
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.castError) {
                next(createError(404, 'Invalid product Id'))
                return;  
            }  
            next(error)//"will go to error handler in app.js"
        }
        // res.send('deleting a single id...')
    }
}